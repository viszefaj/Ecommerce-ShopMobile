import React from "react";
import Slider from "../../components/slider/Slider";
import FlashDeals from "../../components/FlashDeals/FlashDeals";
import Data from "../../components/FlashDeals/Data";

const Home = () =>{
    return (
        <div>
            <Slider/>
            <FlashDeals productItems={Data.productItems} />
        </div>
        
        
    )
}
export default Home