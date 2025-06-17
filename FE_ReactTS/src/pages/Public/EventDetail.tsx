import { useState } from 'react';
import { useParams } from 'react-router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EventContent from '@/components/event/EventContent';
import CustomCircularLoading from '@/components/layouts/CustomCircularLoading';

const EventDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <main className='bg-[#fdf6ea]'>
            <Header />

            <div className="container mx-auto">
                {isLoading && <CustomCircularLoading />}
                <div className="my-10">
                    <EventContent 
                        id={id!} 
                        onLoadComplete={() => setIsLoading(false)} 
                    />
                </div>
            </div>

            <Footer />
        </main>
    );
};

export default EventDetail; 