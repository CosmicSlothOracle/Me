#!/usr/bin/env node

/**
 * Backend API Test Suite für Chatbot
 * Automatisierte Tests für netlify/functions/chat.js
 *
 * Ausführung: node tests/backend-api-tests.js
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

class BackendTestSuite {
    constructor() {
        this.baseUrl = 'http://localhost:8888';
        this.apiEndpoint = '/.netlify/functions/chat';
        this.testResults = [];
        this.startTime = null;

        // Test-Konfiguration
        this.config = {
            timeout: 10000,
            retries: 3,
            verbose: true
        };
    }

    log(message, type = 'INFO') {
        const timestamp = new Date().toISOString();
        const logLine = `[${timestamp}] ${type}: ${message}`;

        if (this.config.verbose) {
            console.log(logLine);
        }

        return logLine;
    }

    async makeRequest(method, path, data = null, headers = {}) {
        return new Promise((resolve, reject) => {
            const url = new URL(path, this.baseUrl);
            const options = {
                hostname: url.hostname,
                port: url.port,
                path: url.pathname,
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers
                },
                timeout: this.config.timeout
            };

            const req = http.request(options, (res) => {
                let body = '';

                res.on('data', (chunk) => {
                    body += chunk;
                });

                res.on('end', () => {
                    try {
                        const parsedBody = body ? JSON.parse(body) : null;
                        resolve({
                            statusCode: res.statusCode,
                            headers: res.headers,
                            body: parsedBody,
                            rawBody: body
                        });
                    } catch (error) {
                        resolve({
                            statusCode: res.statusCode,
                            headers: res.headers,
                            body: null,
                            rawBody: body,
                            parseError: error.message
                        });
                    }
                });
            });

            req.on('error', (error) => {
                reject(error);
            });

            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request timeout'));
            });

            if (data) {
                req.write(JSON.stringify(data));
            }

            req.end();
        });
    }

    async runTest(testName, testFunction) {
        const testStart = Date.now();
        this.log(`Starte Test: ${testName}`);

        try {
            const result = await testFunction();
            const duration = Date.now() - testStart;

            const testResult = {
                name: testName,
                passed: result.passed,
                duration: duration,
                details: result.details || [],
                error: result.error || null,
                timestamp: new Date().toISOString()
            };

            this.testResults.push(testResult);
            this.log(`Test ${testName}: ${result.passed ? 'PASSED' : 'FAILED'} (${duration}ms)`,
                     result.passed ? 'PASS' : 'FAIL');

            if (result.error) {
                this.log(`Fehler: ${result.error}`, 'ERROR');
            }

            return testResult;

        } catch (error) {
            const duration = Date.now() - testStart;
            const testResult = {
                name: testName,
                passed: false,
                duration: duration,
                details: [],
                error: error.message,
                timestamp: new Date().toISOString()
            };

            this.testResults.push(testResult);
            this.log(`Test ${testName}: FAILED (${duration}ms) - ${error.message}`, 'FAIL');

            return testResult;
        }
    }

    // Test 3.1.1: CORS-Header Validierung
    async testCORSHeaders() {
        return await this.runTest('CORS Headers Validation', async () => {
            const details = [];
            let allPassed = true;

            // OPTIONS Request Test
            const optionsResponse = await this.makeRequest('OPTIONS', this.apiEndpoint, null, {
                'Origin': 'http://localhost:8888',
                'Access-Control-Request-Method': 'POST'
            });

            // Status Code prüfen
            const statusOK = optionsResponse.statusCode === 200;
            details.push({ check: 'OPTIONS Status 200', passed: statusOK });
            if (!statusOK) allPassed = false;

            // CORS Headers prüfen
            const corsOrigin = optionsResponse.headers['access-control-allow-origin'] === '*';
            details.push({ check: 'Access-Control-Allow-Origin: *', passed: corsOrigin });
            if (!corsOrigin) allPassed = false;

            const corsMethods = optionsResponse.headers['access-control-allow-methods']?.includes('POST');
            details.push({ check: 'Access-Control-Allow-Methods includes POST', passed: !!corsMethods });
            if (!corsMethods) allPassed = false;

            const corsHeaders = optionsResponse.headers['access-control-allow-headers']?.includes('Content-Type');
            details.push({ check: 'Access-Control-Allow-Headers includes Content-Type', passed: !!corsHeaders });
            if (!corsHeaders) allPassed = false;

            return { passed: allPassed, details };
        });
    }

    // Test 3.1.2: HTTP Method Validation
    async testHTTPMethodValidation() {
        return await this.runTest('HTTP Method Validation', async () => {
            const details = [];
            let allPassed = true;

            // GET Request (sollte fehlschlagen)
            const getResponse = await this.makeRequest('GET', this.apiEndpoint);

            const correctStatus = getResponse.statusCode === 405;
            details.push({ check: 'GET returns 405 Method Not Allowed', passed: correctStatus });
            if (!correctStatus) allPassed = false;

            const errorMessage = getResponse.body?.error === 'Method not allowed';
            details.push({ check: 'Correct error message', passed: errorMessage });
            if (!errorMessage) allPassed = false;

            // PUT Request (sollte auch fehlschlagen)
            const putResponse = await this.makeRequest('PUT', this.apiEndpoint);
            const putStatus = putResponse.statusCode === 405;
            details.push({ check: 'PUT returns 405 Method Not Allowed', passed: putStatus });
            if (!putStatus) allPassed = false;

            return { passed: allPassed, details };
        });
    }

    // Test 3.1.3: Request Body Validation
    async testRequestBodyValidation() {
        return await this.runTest('Request Body Validation', async () => {
            const details = [];
            let allPassed = true;

            // Test 1: Invalid JSON
            try {
                const invalidJSONResponse = await this.makeRequest('POST', this.apiEndpoint, null, {
                    'Content-Type': 'application/json'
                });
                // Sende raw invalid JSON
                const req = http.request({
                    hostname: 'localhost',
                    port: 8888,
                    path: this.apiEndpoint,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                }, (res) => {
                    let body = '';
                    res.on('data', chunk => body += chunk);
                    res.on('end', () => {
                        const isError400 = res.statusCode === 400;
                        details.push({ check: 'Invalid JSON returns 400', passed: isError400 });
                        if (!isError400) allPassed = false;
                    });
                });
                req.write('invalid json');
                req.end();
            } catch (error) {
                details.push({ check: 'Invalid JSON handled', passed: true });
            }

            // Test 2: Missing Message
            const emptyBodyResponse = await this.makeRequest('POST', this.apiEndpoint, {});
            const emptyStatus = emptyBodyResponse.statusCode === 400;
            details.push({ check: 'Empty body returns 400', passed: emptyStatus });
            if (!emptyStatus) allPassed = false;

            const emptyMessage = emptyBodyResponse.body?.error?.includes('required');
            details.push({ check: 'Correct "required" error message', passed: !!emptyMessage });
            if (!emptyMessage) allPassed = false;

            // Test 3: Empty Message String
            const emptyStringResponse = await this.makeRequest('POST', this.apiEndpoint, { message: '' });
            const emptyStringStatus = emptyStringResponse.statusCode === 400;
            details.push({ check: 'Empty message string returns 400', passed: emptyStringStatus });
            if (!emptyStringStatus) allPassed = false;

            // Test 4: Nur Leerzeichen
            const whitespaceResponse = await this.makeRequest('POST', this.apiEndpoint, { message: '   ' });
            const whitespaceStatus = whitespaceResponse.statusCode === 400;
            details.push({ check: 'Whitespace-only message returns 400', passed: whitespaceStatus });
            if (!whitespaceStatus) allPassed = false;

            return { passed: allPassed, details };
        });
    }

    // Test 3.2.1: API Key Validation
    async testAPIKeyValidation() {
        return await this.runTest('API Key Validation', async () => {
            const details = [];

            // Dieser Test kann nur durchgeführt werden, wenn wir die Environment-Variable kontrollieren können
            // Wir prüfen stattdessen die erwartete Error-Response-Struktur

            const testMessage = { message: 'Test ohne API Key' };
            const response = await this.makeRequest('POST', this.apiEndpoint, testMessage);

            // Wenn kein API Key vorhanden ist, sollte 500 zurückgegeben werden
            const hasCorrectStructure = response.body && typeof response.body.error === 'string';
            details.push({ check: 'Error response has correct structure', passed: hasCorrectStructure });

            // Server sollte keine sensiblen Informationen preisgeben
            const noSensitiveData = !response.rawBody.includes('sk-') && !response.rawBody.includes('API_KEY');
            details.push({ check: 'No sensitive data in response', passed: noSensitiveData });

            return { passed: hasCorrectStructure && noSensitiveData, details };
        });
    }

    // Test 3.2.2: Gültige OpenAI Anfrage
    async testValidOpenAIRequest() {
        return await this.runTest('Valid OpenAI Request', async () => {
            const details = [];
            let allPassed = true;

            const testMessage = { message: 'Hallo, was sind Pixel Art Workflows?' };
            const response = await this.makeRequest('POST', this.apiEndpoint, testMessage);

            // Status Code prüfen
            const statusOK = response.statusCode === 200;
            details.push({ check: 'Status 200 OK', passed: statusOK });
            if (!statusOK) allPassed = false;

            // Response-Struktur prüfen
            const hasReply = response.body && typeof response.body.reply === 'string';
            details.push({ check: 'Response contains reply field', passed: hasReply });
            if (!hasReply) allPassed = false;

            if (hasReply) {
                // Deutsche Antwort prüfen (einfache Heuristik)
                const isGerman = response.body.reply.includes('ich') ||
                                response.body.reply.includes('und') ||
                                response.body.reply.includes('der');
                details.push({ check: 'Response is in German', passed: isGerman });
                if (!isGerman) allPassed = false;

                // Portfolio-Kontext prüfen
                const hasPortfolioContext = response.body.reply.toLowerCase().includes('comfy') ||
                                          response.body.reply.toLowerCase().includes('pixel') ||
                                          response.body.reply.toLowerCase().includes('workflow');
                details.push({ check: 'Response mentions portfolio context', passed: hasPortfolioContext });
                if (!hasPortfolioContext) allPassed = false;

                // Antwort-Länge prüfen
                const hasReasonableLength = response.body.reply.length > 10 && response.body.reply.length < 2000;
                details.push({ check: 'Response has reasonable length', passed: hasReasonableLength });
                if (!hasReasonableLength) allPassed = false;
            }

            return { passed: allPassed, details };
        });
    }

    // Test: Input Sanitization
    async testInputSanitization() {
        return await this.runTest('Input Sanitization', async () => {
            const details = [];
            let allPassed = true;

            const maliciousInputs = [
                '<script>alert("XSS")</script>',
                'javascript:alert("XSS")',
                '"; DROP TABLE users; --',
                '<img src=x onerror=alert("XSS")>',
                '../../etc/passwd'
            ];

            for (const maliciousInput of maliciousInputs) {
                const response = await this.makeRequest('POST', this.apiEndpoint, { message: maliciousInput });

                // Sollte nicht in einem Fehler resultieren (500)
                const notServerError = response.statusCode !== 500;
                details.push({
                    check: `Malicious input handled: ${maliciousInput.substring(0, 20)}...`,
                    passed: notServerError
                });
                if (!notServerError) allPassed = false;

                // Response sollte keine gefährlichen Inhalte enthalten
                if (response.body && response.body.reply) {
                    const safeResponse = !response.body.reply.includes('<script>') &&
                                       !response.body.reply.includes('javascript:');
                    details.push({
                        check: `Safe response for: ${maliciousInput.substring(0, 20)}...`,
                        passed: safeResponse
                    });
                    if (!safeResponse) allPassed = false;
                }
            }

            return { passed: allPassed, details };
        });
    }

    // Test: Rate Limiting
    async testRateLimiting() {
        return await this.runTest('Rate Limiting', async () => {
            const details = [];
            let allPassed = true;

            // Test mit sehr langer Nachricht
            const longMessage = 'A'.repeat(1001); // Über dem Limit von 1000 Zeichen
            const response = await this.makeRequest('POST', this.apiEndpoint, { message: longMessage });

            const rejectedLongMessage = response.statusCode === 400;
            details.push({ check: 'Long message (>1000 chars) rejected', passed: rejectedLongMessage });
            if (!rejectedLongMessage) allPassed = false;

            const correctErrorMessage = response.body?.error?.includes('too long');
            details.push({ check: 'Correct "too long" error message', passed: !!correctErrorMessage });
            if (!correctErrorMessage) allPassed = false;

            // Test mit genau 1000 Zeichen (sollte akzeptiert werden)
            const exactMessage = 'A'.repeat(1000);
            const exactResponse = await this.makeRequest('POST', this.apiEndpoint, { message: exactMessage });

            const acceptedExactMessage = exactResponse.statusCode !== 400 ||
                                       !exactResponse.body?.error?.includes('too long');
            details.push({ check: 'Exact 1000 chars accepted', passed: acceptedExactMessage });
            if (!acceptedExactMessage) allPassed = false;

            return { passed: allPassed, details };
        });
    }

    // Test: Response Performance
    async testResponsePerformance() {
        return await this.runTest('Response Performance', async () => {
            const details = [];
            let allPassed = true;

            const testMessage = { message: 'Kurze Test-Frage' };
            const performanceTests = [];

            // 5 Requests für Durchschnitt
            for (let i = 0; i < 5; i++) {
                const startTime = Date.now();
                const response = await this.makeRequest('POST', this.apiEndpoint, testMessage);
                const endTime = Date.now();
                const duration = endTime - startTime;

                performanceTests.push({
                    duration: duration,
                    statusCode: response.statusCode,
                    hasResponse: !!response.body?.reply
                });
            }

            const averageTime = performanceTests.reduce((sum, test) => sum + test.duration, 0) / performanceTests.length;
            const maxTime = Math.max(...performanceTests.map(test => test.duration));
            const successfulRequests = performanceTests.filter(test => test.statusCode === 200).length;

            // Performance-Kriterien
            const averageUnder10s = averageTime < 10000;
            details.push({ check: 'Average response time < 10s', passed: averageUnder10s });
            if (!averageUnder10s) allPassed = false;

            const maxUnder15s = maxTime < 15000;
            details.push({ check: 'Max response time < 15s', passed: maxUnder15s });
            if (!maxUnder15s) allPassed = false;

            const allSuccessful = successfulRequests === 5;
            details.push({ check: 'All requests successful', passed: allSuccessful });
            if (!allSuccessful) allPassed = false;

            this.log(`Performance Metrics: Avg: ${averageTime.toFixed(0)}ms, Max: ${maxTime}ms, Success Rate: ${successfulRequests}/5`);

            return { passed: allPassed, details };
        });
    }

    // Haupttest-Methode
    async runAllTests() {
        this.log('🚀 Starte Backend API Test Suite');
        this.log(`Ziel: ${this.baseUrl}${this.apiEndpoint}`);
        this.startTime = Date.now();

        // Server-Erreichbarkeit prüfen
        try {
            await this.makeRequest('OPTIONS', this.apiEndpoint);
            this.log('✅ Server ist erreichbar');
        } catch (error) {
            this.log(`❌ Server nicht erreichbar: ${error.message}`, 'ERROR');
            this.log('Bitte starte den Server mit: netlify dev');
            return;
        }

        // Tests ausführen
        await this.testCORSHeaders();
        await this.testHTTPMethodValidation();
        await this.testRequestBodyValidation();
        await this.testAPIKeyValidation();
        await this.testValidOpenAIRequest();
        await this.testInputSanitization();
        await this.testRateLimiting();
        await this.testResponsePerformance();

        // Ergebnisse zusammenfassen
        this.generateReport();
    }

    generateReport() {
        const totalDuration = Date.now() - this.startTime;
        const totalTests = this.testResults.length;
        const passedTests = this.testResults.filter(test => test.passed).length;
        const failedTests = totalTests - passedTests;

        console.log('\n' + '='.repeat(80));
        console.log('📊 BACKEND API TEST REPORT');
        console.log('='.repeat(80));
        console.log(`⏱️  Gesamte Ausführungszeit: ${totalDuration}ms`);
        console.log(`📈 Tests gesamt: ${totalTests}`);
        console.log(`✅ Bestanden: ${passedTests}`);
        console.log(`❌ Fehlgeschlagen: ${failedTests}`);
        console.log(`📊 Erfolgsrate: ${(passedTests / totalTests * 100).toFixed(1)}%`);
        console.log('='.repeat(80));

        // Detaillierte Ergebnisse
        this.testResults.forEach(test => {
            const status = test.passed ? '✅ PASSED' : '❌ FAILED';
            console.log(`\n${status} - ${test.name} (${test.duration}ms)`);

            if (test.details && test.details.length > 0) {
                test.details.forEach(detail => {
                    const icon = detail.passed ? '  ✓' : '  ✗';
                    console.log(`${icon} ${detail.check}`);
                });
            }

            if (test.error) {
                console.log(`  🔥 Error: ${test.error}`);
            }
        });

        // Empfehlungen
        console.log('\n' + '='.repeat(80));
        console.log('💡 EMPFEHLUNGEN');
        console.log('='.repeat(80));

        if (failedTests > 0) {
            console.log('❗ Es wurden Fehler gefunden. Bitte prüfe:');
            console.log('   - Ist die OPENAI_API_KEY korrekt gesetzt?');
            console.log('   - Läuft der Netlify Dev Server?');
            console.log('   - Sind alle Dependencies installiert?');
        } else {
            console.log('🎉 Alle Tests bestanden! Die API funktioniert ordnungsgemäß.');
        }

        console.log('\n📝 Für detaillierte Logs siehe Konsolen-Output oben.');
        console.log('🔄 Wiederhole Tests mit: node tests/backend-api-tests.js');
        console.log('='.repeat(80));

        // Test-Report als JSON speichern
        this.saveTestReport();
    }

    saveTestReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                totalTests: this.testResults.length,
                passedTests: this.testResults.filter(test => test.passed).length,
                failedTests: this.testResults.filter(test => !test.passed).length,
                totalDuration: Date.now() - this.startTime
            },
            tests: this.testResults,
            environment: {
                baseUrl: this.baseUrl,
                apiEndpoint: this.apiEndpoint,
                nodeVersion: process.version,
                platform: process.platform
            }
        };

        const reportPath = path.join(__dirname, 'backend-test-report.json');
        fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
        this.log(`📄 Test-Report gespeichert: ${reportPath}`);
    }
}

// Test Suite ausführen wenn direkt aufgerufen
if (require.main === module) {
    const testSuite = new BackendTestSuite();

    // CLI-Argumente verarbeiten
    const args = process.argv.slice(2);
    if (args.includes('--quiet')) {
        testSuite.config.verbose = false;
    }
    if (args.includes('--timeout')) {
        const timeoutIndex = args.indexOf('--timeout');
        testSuite.config.timeout = parseInt(args[timeoutIndex + 1]) || 10000;
    }

    testSuite.runAllTests().catch(error => {
        console.error('❌ Test Suite Fehler:', error);
        process.exit(1);
    });
}

module.exports = BackendTestSuite;