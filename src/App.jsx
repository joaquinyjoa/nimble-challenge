import { use, useEffect } from "react";

function App() {

  useEffect(() =>{
    const fetchData = async () => {
      try {

        const response = await fetch(
        "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api/candidate/get-by-email?email=tuemail@gmail.com"
        );

        if(!response.ok){
          throw new Error("Error en la solicitud: " + response.status);
        }

        const data = await response.json();
        console.log("Datos obtenidos:", data);

      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }

      fetchData();
      
    }
  }, [])

  return (
    <div>
      <h1>Nimble Challenge</h1>
    </div>
  );
  
}