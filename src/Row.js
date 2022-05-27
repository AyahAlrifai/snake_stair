import './index.css';
import Box from './Box.js';

const Row =(props)=>{
    let arr=[1,2,3,4,5,6,7,8,9,10];
    let color=["#ffff00","#ffffff","#ff0000","#0000ff","#00ff00"]
    return  <div className='container_1'>
        {
        arr.map((value) => {
            let num = props.start%2 ===0 ? 10*props.start+value : 10*(props.start+1)-(value-1)
            return <Box key={"cell"+10*props.start+value} num={num} background={color[(value+3*props.start)%5]} />
        })}
  </div>
}

export default Row;