const Staircase = (props) => {
    const dimentions = props.dimentions;
    let staircase = props.data;
    return <>
        {
            staircase.map((value) => {

                let e1 = dimentions[value[0]];
                let e2 = dimentions[value[1]];

                if (e1 !== undefined && e2 !== undefined) {
                    let base = Math.min(window.screen.width, window.screen.height) / 20;

                    let left = Math.min(e1[0], e2[0]) + base;
                    let top = Math.min(e1[1], e2[1]) + base;

                    let x = Math.abs(e1[0] - e2[0]);
                    let y = Math.abs(e1[1] - e2[1]);

                    if (e1[0] < e2[0])
                        return <svg key={value[0] + "_" + value[1]} height={y} width={x} style={{ position: "fixed", top: top, left: left }}>
                            <line x1="0px" y1={y} x2={x} y2="0" strokeDasharray="5,15"  d="M5 60 l215 0" style={{ stroke: "#473122", strokeWidth: "20" }} />
                        </svg>
                    if (e1[0] > e2[0])
                        return <svg key={value[0] + "_" + value[1]} height={y} width={x} style={{ position: "fixed", top: top, left: left }}>
                            <line x1="0" y1="0" x2={x} y2={y} strokeDasharray="5,15"  d="M5 60 l215 0" style={{ stroke: "#473122", strokeWidth: "20" }} />
                        </svg>
                } else {
                    return <></>
                }

            })
        } </>
}

export default Staircase;