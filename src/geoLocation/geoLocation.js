navigator.geolocation.getCurrentPosition(pos => {
  console.log('Lat:', pos.coords.latitude, 'Lng:', pos.coords.longitude);
});
