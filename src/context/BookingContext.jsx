import React, { createContext, useState, useEffect } from 'react';

export const BookingContext = createContext(null);

const DEFAULT_STATE = {
  selectedCentre: 'Little Sprouts Academy',
  selectedDate: '7',
  selectedTime: '10:30 AM',
  formData: {
    parentName: 'Jane Doe',
    email: '',
    phone: '',
    childName: '',
    childAge: '',
    language: '',
    requirements: '',
  }
};

export function BookingProvider({ children }) {
  const [selectedCentre, setSelectedCentreState] = useState(() => {
    const saved = localStorage.getItem('kiddotour_selectedCentre');
    return saved !== null ? saved : DEFAULT_STATE.selectedCentre;
  });

  const [selectedDate, setSelectedDateState] = useState(() => {
    const saved = localStorage.getItem('kiddotour_selectedDate');
    return saved !== null ? saved : DEFAULT_STATE.selectedDate;
  });

  const [selectedTime, setSelectedTimeState] = useState(() => {
    const saved = localStorage.getItem('kiddotour_selectedTime');
    return saved !== null ? saved : DEFAULT_STATE.selectedTime;
  });

  const [formData, setFormDataState] = useState(() => {
    const saved = localStorage.getItem('kiddotour_formData');
    try {
      return saved !== null ? JSON.parse(saved) : DEFAULT_STATE.formData;
    } catch {
      return DEFAULT_STATE.formData;
    }
  });

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('kiddotour_selectedCentre', selectedCentre);
  }, [selectedCentre]);

  useEffect(() => {
    localStorage.setItem('kiddotour_selectedDate', selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    localStorage.setItem('kiddotour_selectedTime', selectedTime);
  }, [selectedTime]);

  useEffect(() => {
    localStorage.setItem('kiddotour_formData', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (key, value) => {
    setFormDataState((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const setCentre = (centre) => {
    setSelectedCentreState(centre);
  };

  const setDate = (date) => {
    setSelectedDateState(date);
  };

  const setTime = (time) => {
    setSelectedTimeState(time);
  };

  const resetBooking = () => {
    setSelectedCentreState(DEFAULT_STATE.selectedCentre);
    setSelectedDateState(DEFAULT_STATE.selectedDate);
    setSelectedTimeState(DEFAULT_STATE.selectedTime);
    setFormDataState(DEFAULT_STATE.formData);
  };

  return (
    <BookingContext.Provider
      value={{
        selectedCentre,
        selectedDate,
        selectedTime,
        formData,
        setCentre,
        setDate,
        setTime,
        updateFormData,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}
