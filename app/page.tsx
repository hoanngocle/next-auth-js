import Image from 'next/image';
import { options } from './api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

export default async function Home() {
    const session = await getServerSession(options);
    return <>{session ? <div>Home</div> : <h1 className='text-5xl'>You Shall Not Pass!</h1>}</>;
}
