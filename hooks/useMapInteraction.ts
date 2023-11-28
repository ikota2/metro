import { useState, useCallback } from 'react';
import getDistance from 'geolib/es/getDistance';
import {MapPressEvent} from 'react-native-maps';
import {SelectedDetails, Station} from '../types';

function useMapInteraction(stations: Station[]) {
  const [selectedDetails, setSelectedDetails] = useState<SelectedDetails>({
    selectedIdFrom: null,
    selectedIdTo: null,
    selectedNameFrom: '',
    selectedNameTo: ''
  });

  const handleMapPress = useCallback((event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    let isZoneSelected = false;

    stations.forEach(station => {
      const distance = getDistance(
        { latitude, longitude },
        { latitude: station.latitude, longitude: station.longitude }
      );

      if (distance <= 15) {
        isZoneSelected = true;
        handleLocationClick(station.name, station.id);
      }
    });

    if (!isZoneSelected) {
      setSelectedDetails({ ...selectedDetails, selectedIdFrom: null, selectedIdTo: null });
    }
  }, [stations, selectedDetails]);

  const handleLocationClick = useCallback((stationName: string, stationId: string) => {
    if (selectedDetails.selectedNameFrom === stationName || selectedDetails.selectedNameTo === stationName) {
      if (selectedDetails.selectedNameFrom === stationName) {
        setSelectedDetails({
          ...selectedDetails,
          selectedIdFrom: null,
          selectedNameFrom: ''
        });
      } else {
        setSelectedDetails({
          selectedIdFrom: stationId,
          selectedNameFrom: stationName,
          selectedIdTo: null,
          selectedNameTo: ''
        });
      }
    } else if (selectedDetails.selectedNameFrom && selectedDetails.selectedNameTo) {
      setSelectedDetails({
        selectedIdFrom: stationId,
        selectedNameFrom: stationName,
        selectedIdTo: null,
        selectedNameTo: ''
      });
    } else if (selectedDetails.selectedNameFrom && !selectedDetails.selectedNameTo) {
      setSelectedDetails({
        ...selectedDetails,
        selectedIdTo: stationId,
        selectedNameTo: stationName
      });
    } else {
      setSelectedDetails({
        selectedIdFrom: stationId,
        selectedNameFrom: stationName,
        selectedIdTo: null,
        selectedNameTo: ''
      });
    }
  }, [selectedDetails]);


  const handleFromChange = useCallback((stationName: string) => {
    const station = stations.find(station => station.name === stationName);
    setSelectedDetails({
      ...selectedDetails,
      selectedNameFrom: stationName,
      selectedIdFrom: station ? station.id : null,
    });
  }, [stations, selectedDetails]);

  const handleToChange = useCallback((stationName: string) => {
    const station = stations.find(station => station.name === stationName);
    setSelectedDetails({
      ...selectedDetails,
      selectedNameTo: stationName,
      selectedIdTo: station ? station.id : null,
    });
  }, [stations, selectedDetails]);

  // Экспортируем handlers как один объект
  const handlers = { handleFromChange, handleToChange };

  return { selectedDetails, handleMapPress, handleLocationClick, handlers };}

export default useMapInteraction;
