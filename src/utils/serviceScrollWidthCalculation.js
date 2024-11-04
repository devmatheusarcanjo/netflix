export default function useServiceScrollWidthCalculation({event, condition, setCondition}) {    
    const {target} = event;
    
   const scrollWidth = target.scrollWidth, 
         clientWidth = target.clientWidth,
         scrollLeft = target.scrollLeft;
                    
    const scrollRight = scrollWidth - clientWidth - scrollLeft;
           
    const integer = parseInt(scrollRight);       
    
    if(integer < 300 && !condition.includes(scrollWidth)) {                            
        return [...condition, scrollWidth];
    };        
                       
}