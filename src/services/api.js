const URL_BASE = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

// Función para obtener los datos del candidato por correo electrónico
export const obtenerCandidatoPorCorreo = async (correo) => {
  try {
    const respuesta = await fetch(
      `${URL_BASE}/api/candidate/get-by-email?email=${correo}`
    );

    if (!respuesta.ok) {
      throw new Error(`Error en la solicitud: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    return datos;

  } catch (error) {
    console.error("Error al obtener los datos del candidato:", error);
    throw error;
  }
};

// Función para obtener la lista de trabajos disponibles
export const obtenerTrabajos = async () => {
  try {
    const respuesta = await fetch(`${URL_BASE}/api/jobs/get-list`);

    if (!respuesta.ok) {
      throw new Error(`Error en la solicitud: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    return datos;

  } catch (error) {
    console.error("Error al obtener los trabajos:", error);
    throw error;
  }
};

// Función para enviar la postulación a un trabajo
export const postularseATrabajo = async (datosPostulacion) => {
  try {
    const respuesta = await fetch(`${URL_BASE}/api/candidate/apply-to-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosPostulacion),
    });

    if (!respuesta.ok) {
      throw new Error(`Error en la solicitud: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    return datos;

  } catch (error) {
    console.error("Error al enviar la postulación:", error);
    throw error;
  }
};