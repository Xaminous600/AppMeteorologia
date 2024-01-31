import './page.css'

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
            <img src='sateliteHome.gif'/>
            <span>Consulta todo tipo de datos meteorológicos</span>
          </div>

          <div>
            <h1>Meteorología en</h1>
            <h1>tiempo real</h1>
            <span>Datos meteorológicos en tiempo real para proporcionarte información precisa y actualizada</span>
            <img src='portadaNube.png'/>
          </div>

          <div>
            <h1>En cualquier parte del mundo...</h1>
            <img src='globoHome.gif'/>
          </div>
        </div>
      </div>
      
    </main>
  );
}
