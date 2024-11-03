import { useEffect } from "react";


function touchstart(event, { container, styles}) { 
         
          const { target } = event;                   
         /* Esse card gerado pelo component MovieItem */
         const card = target.closest('[data-item="card"]')  
          
         if(!card) return;                                                                                        
         
         /* Over é o elemento dentro do card que é responsavel por exibir o efeito visual de hover */          
         const over = card.querySelector('[data-item="over"]');           
          
         /* Essa linha serve para obter as posições do clique baseado na viewport */                  
         const touch = event.touches[0]
            
         /* Calculo para obter a posição exata do clique dentro do card */
         const X = touch.clientX - card.getBoundingClientRect().left;
         const Y = touch.clientY - card.getBoundingClientRect().top;
             
         /* Define a posição do elemento de hover para o ponto exato que o usuario clicou, dessa forma o hover ira crescer a partir do ponto de clique */                  
         over.style.top = `${Y}px`;
         over.style.left = `${X}px`;
              
         /* Acionabdo o efeito de hover no item clicado */    
         over.classList.add(styles.crescer); 
         
         /* Event listener para remover o hover após o usuario remover o dedo da tela */       
         container.addEventListener("touchend", (event) => {                                         
            if(over) over.classList.remove(styles.crescer);                        
         }, {once: true})                                                   
       }


       


export default function useTouchHover({content, styles}) {
    
    
    useEffect(() => {             
       if(content) {                
       const container = content.current;       
       container.addEventListener("touchstart", (event) => {
       touchstart(event, {container, styles})    
       })                                       
      
       /* Apos o componente ser destruido, remover o listener de evento do componente que executou esse hook */
           return () => container.removeEventListener("touchstart", touchstart);
        
      }   
                    
},[])    
}
        
         
                                   
       

       
       
       
       