import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

let cachedCertificates = null;
let cacheExpiry = 0;

async function getFirebaseCertificates() {
  const now = Date.now();
  if (cachedCertificates && now < cacheExpiry) {
    return cachedCertificates;
  }

  const response = await fetch(
    'https://www.googleapis.com/robot/v1/metadata/x509/securetoken-system@system.gserviceaccount.com'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch Firebase public certificates');
  }

  const certs = await response.json();
  
  // Cache for 1 hour
  cachedCertificates = certs;
  cacheExpiry = now + 3600 * 1000;
  return certs;
}

export async function verifyFirebaseIdToken(token) {
  const decoded = jwt.decode(token, { complete: true });
  if (!decoded || !decoded.header || !decoded.header.kid) {
    throw new Error('Invalid Firebase ID token format');
  }

  const certs = await getFirebaseCertificates();
  const cert = certs[decoded.header.kid];
  if (!cert) {
    throw new Error('Firebase ID token signed by unknown key');
  }

  const projectId = env.firebaseProjectId;
  if (!projectId) {
    throw new Error('Firebase Project ID is not configured on the backend');
  }

  const payload = jwt.verify(token, cert, {
    algorithms: ['RS256'],
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`
  });

  return payload;
}
