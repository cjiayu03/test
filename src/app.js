// A tiny module with a few functions we can test in CI.

/**
 * Generate a running incident code like INC-0001, INC-0042
 */
function generateIncidentCode(number) {
  if (!Number.isInteger(number) || number < 1) {
    throw new Error('Incident number must be a positive integer');
  }
  return `INC-${String(number).padStart(4, '0')}`;
}

/**
 * Validate a severity level
 */
const VALID_SEVERITIES = ['L1', 'L2', 'L3(Significant)', 'L3(Minor)', 'L4'];

function isValidSeverity(severity) {
  return VALID_SEVERITIES.includes(severity);
}

/**
 * Simple health check payload (what a server route might return)
 */
function healthCheck() {
  return { status: 'ok', timestamp: new Date().toISOString() };
}

// If run directly (npm start), print a quick demo
if (require.main === module) {
  console.log('App running. Sample incident code:', generateIncidentCode(1));
  console.log('Health:', healthCheck());
}

module.exports = { generateIncidentCode, isValidSeverity, healthCheck, VALID_SEVERITIES };
