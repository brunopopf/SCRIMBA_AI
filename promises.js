(async () => {
    console.log("Starting");
    const result = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Hello, world!");
        }, 1000);
    });
    console.log(result);
    console.log("Ending");
})();



// The modern, best-practice async/await way
try {
    const stream = await openai.chat.completions.create({ ... });
    showStream(stream); 
  } catch (error) {
    // If the promise rejects, JavaScript throws it here instantly!
    console.error("API Call Failed!", error);
    showErrorUI();
  }


// BAD PRACTICE: This takes 4 seconds total (waits for user, THEN waits for products)
const user = await fetchUser();       // Takes 2 seconds
const products = await fetchProducts(); // Takes 2 seconds

// BEST PRACTICE: This takes only 2 seconds total!
// We kick both off together and manipulate the Promise array
const [user, products] = await Promise.all([
  fetchUser(), 
  fetchProducts()
]);


// .map() crea un ARRAY DE PROMESAS (cuatro promesas pendientes de fetch)
const ids =[1,2,3,4];

const promesasDeProductos = ids.map(id => fetch(`https://api.com{id}`).then(r => r.json()));

// Pasamos ese array dinámico a Promise.all
const todosLosProductos = await Promise.all(promesasDeProductos);

console.log(todosLosProductos); // Un array con los 4 productos ya resueltos


*/

// ❌ ENFOQUE LENTO (Secuencial)
const regalosSeleccionados = ["Libro", "Cafetera", "Auriculares"];

try {
  // Si cada petición tarda 1 segundo, esto tardará 3 SEGUNDOS en total.
  for (const regalo of regalosSeleccionados) {
    await guardarRegaloEnServidor(regalo); 
    console.log(`${regalo} guardado.`);
  }
  console.log("¡Todos los regalos guardados secuencialmente!");
} catch (error) {
  console.error("Hubo un error", error);
}

const regaloPromesas = todosLosProductos.map( regalo => guardarRegaloEnServidor(regalo).then( console.log(`${regalo} guardado.`)))