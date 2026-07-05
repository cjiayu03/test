const { test } = require('node:test');
const assert = require('node:assert');
const { generateIncidentCode, isValidSeverity, healthCheck } = require('../src/app');

test('generates zero-padded incident codes', () => {
  assert.strictEqual(generateIncidentCode(1), 'INC-001');
  assert.strictEqual(generateIncidentCode(42), 'INC-0042');
  assert.strictEqual(generateIncidentCode(1234), 'INC-1234');
});

test('rejects invalid incident numbers', () => {
  assert.throws(() => generateIncidentCode(0));
  assert.throws(() => generateIncidentCode(-5));
  assert.throws(() => generateIncidentCode('abc'));
});

test('validates severity levels', () => {
  assert.strictEqual(isValidSeverity('L1'), true);
  assert.strictEqual(isValidSeverity('L3(Significant)'), true);
  assert.strictEqual(isValidSeverity('L5'), false);
  assert.strictEqual(isValidSeverity(''), false);
});

test('health check returns ok status', () => {
  const result = healthCheck();
  assert.strictEqual(result.status, 'ok');
  assert.ok(result.timestamp);
});
