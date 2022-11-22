import React from 'react';
import Signup from '../../components/Signup/Signup';

const getData = async () => {

}

export default async function page() {
  const data = await getData();
  return (
    <>
        <Signup />
    </>
  )
}
