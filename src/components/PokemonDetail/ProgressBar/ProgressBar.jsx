import React, { useEffect, useState } from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar = ({maxValue,color}) => {
    
 
    const progressBar = maxValue;
    const [percentage, setPercentage] = useState(0)

    const updatePercentage = () => {
        setTimeout(() => {
          setPercentage(percentage + 1)
        }, 10)
      }
      
      useEffect(() => {
        if (percentage<progressBar) updatePercentage()
      }, [percentage, progressBar, updatePercentage])


    return (
        <CircularProgressbar 
            value={percentage} 
            strokeWidth={10}
            text={`${percentage}/150`} 
            maxValue={150}
            styles={buildStyles({
                pathTransition: 'stroke-dashoffset 0.5s ease 0s',
                pathColor: color,
                textColor: color,
            })}
        ></CircularProgressbar>
    );
};

export default ProgressBar;