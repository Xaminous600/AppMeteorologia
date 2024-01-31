import './page.css'
import Image from 'next/image';
export default function Home() {
  
  return (
    <main className='main'>
      <div className='textoSuperior'>
        <h1>Observa. Analiza. Explora</h1>
        <span>La información meteorológica es una valiosa fuente de conocimiento. Con TemporaCheck, controlas qué datos deseas consultar en un instante.</span>
      </div>

      <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>
        <div className='cards'>
          <div>
            <Image src='/sateliteHome.gif' alt='Imagen Salite Portada' width={140} height={140}/>
            <span>Consulta todo tipo de datos meteorológicos</span>
          </div>

          <div>
            <h1>Meteorología en</h1>
            <h1>tiempo real</h1>
            <span>Datos meteorológicos en tiempo real para proporcionarte información precisa y actualizada</span>
            <Image src='/portadaNube.png' alt='Imagen Nube Portada' width={100} height={100}/>
          </div>

          <div>
            <h1>En cualquier parte del mundo...</h1>
            <Image src='/globoHome.gif' alt ='Imagen Globo Portada' width={160} height={160}/>
          </div>
        </div>
      </div>
      
    </main>
  );
}
