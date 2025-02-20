import React, {useContext} from "react";
import Child3 from ".child"

function Child2() {
    return (
        <>
            <p>Child2: This is the second child components</p>
            <Child3 />
        </>
    )
}

export default Child2;