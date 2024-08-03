'use client';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
} from '@tremor/react';

export const Observacion = () => (
    <Accordion className=''>
        <AccordionHeader className="font-cocogooseSemiLight  text-darkBlue">Ver Observación</AccordionHeader>
        <AccordionBody className="font-cocogooseSemiLight text-subTitle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            tempor lorem non est congue blandit. Praesent non lorem sodales,
            suscipit est sed, hendrerit dolor.
        </AccordionBody>
    </Accordion>
);