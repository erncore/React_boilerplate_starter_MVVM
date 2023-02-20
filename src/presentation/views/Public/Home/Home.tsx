import { observer } from 'mobx-react-lite';
import LandingLayout from 'presentation/views/layouts/landing';
import React from 'react';

const Home: React.FC = () => {
    return <LandingLayout></LandingLayout>;
};
export default observer(Home);
