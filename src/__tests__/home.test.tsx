import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { ModalProvider } from '~/components/bookings/modal-provider';
import CreateBookFlow from '~/components/create-booking/create-book-flow';
import CreateBookScheduler from '~/components/create-booking/create-book-scheduler';
import JotaiProvider from '~/components/providers/jotai-provider';
import { IPlace, initialPlaces } from '~/services/place-service';
import {
    CreateBookingAtomProp,
    IStates,
    createBookingTabPosAtom,
    dispatchGlobalUserStatesAtom,
    selectedPlaceAtom,
} from '~/services/state-atoms';

global.ResizeObserver = ResizeObserver;

('use client');

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

const placeToTest = initialPlaces[0];

const MockProvider = ({
    children,
    initialBookingTab,
    selectedPlace,
}: {
    children: React.ReactNode;
    initialBookingTab: CreateBookingAtomProp;
    selectedPlace?: IPlace;
}) => {
    const setGlobalStates = useSetAtom(dispatchGlobalUserStatesAtom);
    const [bookingTab, setBookingTab] = useAtom(createBookingTabPosAtom);
    const setSelectedPlace = useSetAtom(selectedPlaceAtom);
    useEffect(() => {
        const user = {
            id: 1,
            name: 'User Name',
            phone: '12345677',
            email: 'email@email.com',
            birthDate: '2021-09-01T00:00:00.000Z',
            gender: 'M',
            country: 'Brazil',
            state: 'São Paulo',
        };
        const globalStates: IStates = {
            user,
            allBookings: [],
            places: initialPlaces,
            loading: false,
        };
        if (selectedPlaceAtom !== undefined) setSelectedPlace(selectedPlace);
        if (bookingTab !== initialBookingTab) setBookingTab(initialBookingTab);
        setGlobalStates(globalStates); // Update the atom with the new state
    }, [
        setGlobalStates,
        bookingTab,
        initialBookingTab,
        selectedPlace,
        setBookingTab,
        setSelectedPlace,
    ]);

    return (
        <JotaiProvider>
            <ModalProvider>
                <ModalProvider>{children}</ModalProvider>
            </ModalProvider>
        </JotaiProvider>
    );
};

it('Test the selection of a place', async () => {
    render(
        <MockProvider initialBookingTab="select">
            <CreateBookFlow />
        </MockProvider>
    );
    const placeCardElement = await screen.findByText(placeToTest.name);
    expect(placeCardElement).toBeInTheDocument();
    // click in the place element

    // click in the place element
    fireEvent.click(placeCardElement);

    // wait for the 'Select' button to appear and click it
    const selectButton = await screen.findByText('Select');
    expect(selectButton).toBeInTheDocument();

    // const editBookingModal = await screen.findByText('Edit Booking');

    // Add assertions to check the behavior after the click events
});

it('Test the Scheduler component', async () => {
    render(
        <MockProvider initialBookingTab="schedule" selectedPlace={placeToTest}>
            <CreateBookScheduler />
        </MockProvider>
    );

    const placeName = await screen.findByText(placeToTest.name);
    expect(placeName).toBeInTheDocument();
    // click in the place element

    // click in the place element
    const saveButton = await screen.findByText('Save');
    expect(saveButton).toBeInTheDocument();
});
