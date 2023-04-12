
import axiosInstance from '../api/axios';

function getOS(userAgent) {
  const osList = [
    { name: 'Windows 10', regex: /(Windows 10.0|Windows NT 10.0)/ },
    { name: 'Windows 8.1', regex: /(Windows 8.1|Windows NT 6.3)/ },
    { name: 'Windows 8', regex: /(Windows 8|Windows NT 6.2)/ },
    { name: 'Windows 7', regex: /(Windows 7|Windows NT 6.1)/ },
    { name: 'Windows Vista', regex: /Windows NT 6.0/ },
    { name: 'Windows Server 2003', regex: /Windows NT 5.2/ },
    { name: 'Windows XP', regex: /(Windows NT 5.1|Windows XP)/ },
    { name: 'Windows 2000', regex: /(Windows NT 5.0|Windows 2000)/ },
    { name: 'macOS', regex: /(Macintosh|Mac OS X)/ },
    { name: 'Linux', regex: /(Linux|X11)/ },
    { name: 'iOS', regex: /(iPhone|iPad|iPod)/ },
    { name: 'Android', regex: /Android/ },
    { name: 'BlackBerry', regex: /BlackBerry/ },
    { name: 'Windows Phone', regex: /Windows Phone/ }
  ];

  const os = osList.find(os => os.regex.test(userAgent));
  return os ? os.name : 'Unknown';
}

function getDeviceType(userAgent) {
  if (/Mobi/.test(userAgent)) {
    return 'mobile device';
  } else if (/Tablet/.test(userAgent)) {
    return 'tablet device';
  } else if (/Win/.test(userAgent)) {
    return 'Windows desktop';
  } else if (/Mac/.test(userAgent)) {
    return 'Mac desktop';
  } else if (/Linux/.test(userAgent)) {
    return 'Linux desktop';
  } else {
    return 'Unknown device';
  }
}

function getBrowser(userAgent) {
  const browsersList = [
    { name: 'Chrome', regex: /Chrome/ },
    { name: 'Firefox', regex: /Firefox/ },
    { name: 'Safari', regex: /Safari/ },
    { name: 'Opera', regex: /OPR/ },
    { name: 'Edge', regex: /Edg/ },
    { name: 'Internet Explorer', regex: /Trident/ }
  ];

  const browser = browsersList.find(browser => userAgent.match(browser.regex));
  return browser ? browser.name : 'Unknown';
}


async function getDetails() {

  var address =''
  var ip =''
  var os =''
  var deviceType =''
  var browser =''

  try {
   
    const location = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = location.coords;
    const response = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`);
    const data = await response.json();
    address = data.display_name;
     // console.log(`User is at ${address}`);

    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const ipData = await ipResponse.json();
     ip = ipData.ip;
    //console.log(`User's IP address is ${ip}`);
          
    const device = navigator.userAgent;
    os = getOS(device);
    deviceType = getDeviceType(device);
   // console.log(`User is using ${os} on a ${deviceType}`);

    
     browser = getBrowser(device);
    //console.log(`User is using ${browser} browser`);

   
  
  } catch (err) {
      console.log(err)
      
  }
  if (address === null || address === '') {
    address = 'Unknown'
  }if (ip === null || ip === '') {
    ip = 'Unknown'
  }if (os === null || os === '') {
    os = 'Unknown'
  }if (deviceType === null || deviceType === '') {
    deviceType = 'Unknown'
  }if (browser === null || browser === '') {
    browser = 'Unknown'
  }


  return {
"address": address,
"ip":ip,
"os":os,
"devicetype":deviceType,
"browser":browser

  }


}





  const Trail =  async (status) => {
    try {
      const details = await getDetails();
      const token = sessionStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
  
      const auth = await axiosInstance.get('UserAuth/Details', config);
      const url = 'Trail';
      const data = {
        empId: auth.data.empid,
        statusId: status,
        location: `${details.ip} || ${details.address}`,
        device: `${details.browser} || ${details.devicetype} || ${details.os}`
      };
  
      const res = await axiosInstance.post(url, data, config);

      if (status === 7) {
        sessionStorage.clear()
      }
    } catch (error) {
      console.error(error);
    }
  }

  export const trail = Trail
     
		
	
  
