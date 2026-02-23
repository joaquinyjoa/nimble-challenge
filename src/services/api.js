const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

const parseErrorMessage = (status, payload) => {
  if (!payload) return `Error en la solicitud: ${status}`;

  if (typeof payload === "string") {
    return payload;
  }

  const baseMessage = payload.error || payload.message || `Error en la solicitud: ${status}`;
  const details = payload.details || {};
  const formErrors = Array.isArray(details.formErrors) ? details.formErrors : [];
  const fieldErrors = details.fieldErrors || {};
  const flattenedFieldErrors = Object.entries(fieldErrors)
    .flatMap(([field, messages]) => {
      if (!Array.isArray(messages) || messages.length === 0) return [];
      return `${field}: ${messages.join(", ")}`;
    });

  const allDetails = [...formErrors, ...flattenedFieldErrors].filter(Boolean);

  if (!allDetails.length) {
    return baseMessage;
  }

  return `${baseMessage}. ${allDetails.join(" | ")}`;
};

const request = async (url, options) => {
  const response = await fetch(url, options);

  const text = await response.text();
  let payload = null;

  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = text;
    }
  }

  if (!response.ok) {
    throw new Error(parseErrorMessage(response.status, payload));
  }

  return payload;
};

// Función para obtener los datos del candidato por correo electrónico
export const getCandidateByEmail = async (email) => {
  try {
    const data = await request(`${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

// Función para obtener la lista de trabajos disponibles
export const getJobs = async () => {
  try {
    const data = await request(`${BASE_URL}/api/jobs/get-list`);
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

// Función para enviar la solicitud de empleo
export const applyToJob = async (applicationData) => {
    try {
    const data = await request(`${BASE_URL}/api/candidate/apply-to-job`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(applicationData),
        });
        return data;
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        throw error;
    }
};