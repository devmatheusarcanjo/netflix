interface DeviceWidthInterface {
  minDesktop: Number;
  maxMobile: Number;
  minTablet: Number;
}

const deviceWidth: DeviceWidthInterface = {
  minDesktop: 1024,
  minTablet: 768,
  maxMobile: 767,
};

export default deviceWidth;
