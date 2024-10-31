import React from "react";

function IconNavBottom({isAtivo, Active, Inactive, size, className}) {



    return (
      <>
          {isAtivo ? (
              <Active size={size} className={className}/>
          ) : (
              <Inactive size={size} className={className}/>
          )}
      </>
    )
}


export default React.memo(IconNavBottom);