export default function ifDeviceMobile() {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobile = /mobile|android|iphone|ipad|ipod|windows phone/.test(
    userAgent
  );

  return mobile;
}
