
import React from 'react';
import Details_1 from '@/Component/Registration/Details_1';
import Details_2 from '@/Component/Registration/Details_2';
import Details_3 from '@/Component/Registration/Details_3';
import Details_4 from '@/Component/Registration/Details_4';
import Details_5 from '@/Component/Registration/Details_5';
import Details_6 from '@/Component/Registration/Details_6';
import Details_7 from '@/Component/Registration/Details_7';
import Details_8 from '@/Component/Registration/Details_8';


interface RegistrationProps {
  activeComponent: string;
  handleActiveComponent: (componentName: string) => void;
}


const Registration: React.FC<RegistrationProps> = ({ activeComponent, handleActiveComponent }) => {
  return (
    <div> 
      {activeComponent === 'component1' && (
        <Details_1 setActive={handleActiveComponent} />
      )}
      {activeComponent === 'component2' && (
        <Details_2 setActive={handleActiveComponent} />
      )}
      {activeComponent === 'component3' && (
        <Details_3 setActive={handleActiveComponent} />
      )}
      {activeComponent === 'component4' && (
        <Details_4 setActive={handleActiveComponent} />
      )}
      {activeComponent === 'component5' && (
        <Details_5 setActive={handleActiveComponent} />
      )}
      {activeComponent === 'component6' && (
        <Details_6 setActive={handleActiveComponent} />
      )}
       {activeComponent === 'component7' && (
        <Details_7 setActive={handleActiveComponent} />
      )}
      {activeComponent === 'component8' && (
        <Details_8 setActive={handleActiveComponent} />
      )}
    </div>
  )
}

export default Registration
