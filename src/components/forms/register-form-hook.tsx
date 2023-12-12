'use client';

import { useState } from 'react';

export const useRegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    return {
        isLoading,
    };
};
