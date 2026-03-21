import { useEffect, useState, useRef } from 'react';

export const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false); // Estados para saber si el elemento está intersectando o si ya lo ha hecho
    const [hasIntersected, setHasIntersected] = useState(false)
    const elementRef = useRef(null); // Referencia al elemento a observar

    useEffect(() => {
        const element = elementRef.current; // Obtengo el elemento de la referencia o nada
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => { // Uso intersectionObserver para observar el elemento
            setIsIntersecting(entry.isIntersecting); // Actualizo el estado de isIntersecting

            if (entry.isIntersecting && !hasIntersected) { // Actualizo hasIntersected la primera vez que intersecta
                setHasIntersected(true);
            }
        }, options);

        observer.observe(element); // Inicio al observador con el elemento
        
        return () => observer.disconnect(); // Limpio useEffect para evitar leaks de memoria(recordar en futuros hooks)

    }, []);

    
    return { elementRef, isIntersecting, hasIntersected }; // Retorno de la referencia y los estados
}