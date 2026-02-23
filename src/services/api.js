const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

// Función para obtener los datos del candidato por correo electrónico
export const getCandidateByEmail = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${email}`);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

// Función para obtener la lista de trabajos disponibles
export const getJobs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/job/get-list`);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    throw error;
  }
};

// Función para enviar la solicitud de empleo
export const applyToJob = async (applicationData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(applicationData),
        });
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        throw error;
    }
};