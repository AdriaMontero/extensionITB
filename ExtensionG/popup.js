document.getElementById('calculate').addEventListener('click', function() {
  const ip = document.getElementById('ip').value;
  const cidr = document.getElementById('cidr').value;
  const mask = cidrToMask(cidr);
  const result = calculateSubnet(ip, mask);

  let subnetsHTML = `
    <p>Network Address: ${result.network}</p>
    <p>Broadcast Address: ${result.broadcast}</p>
    <p>IP Range: ${result.range}</p>
    <p>Subnet Mask: ${result.decimalMask}</p>
    <p>Default Gateway: ${result.gateway}</p>
  `;

  document.getElementById('result').innerHTML = subnetsHTML;
});

document.getElementById('toggle-dark-mode').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  const toggleButton = document.getElementById('toggle-dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    toggleButton.style.border = '1px solid #666';
  } else {
    toggleButton.style.border = '1px solid #999';
  }
});

document.getElementById('open-interface').addEventListener('click', function() {
  window.location.href = 'popup2.html';
});

document.getElementById('clear-interface').addEventListener('click', function() {
  document.getElementById('result').innerHTML = '';
});

document.getElementById('open-chat').addEventListener('click', function() {
  window.location.href = 'popup3.html';
});

function cidrToMask(cidr) {
  const cidrNumber = parseInt(cidr.replace('/', ''));
  let maskBinary = '';

  for (let i = 0; i < 32; i++) {
    maskBinary += i < cidrNumber ? '1' : '0';
  }

  return maskBinary.match(/.{1,8}/g).map(bin => parseInt(bin, 2)).join('.');
}

function calculateSubnet(ip, mask) {
  // Convert IP to binary
  const ipBinary = ip.split('.').map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('');
  // Convert mask to binary
  const maskBinary = mask.split('.').map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('');

  // Calculate network address
  const networkBinary = ipBinary.split('').map((bit, index) => bit & maskBinary[index]).join('');
  const network = binaryToIp(networkBinary);

  // Calculate broadcast address
  const broadcastBinary = networkBinary.substring(0, maskBinary.indexOf('0')) + '1'.repeat(32 - maskBinary.indexOf('0'));
  const broadcast = binaryToIp(broadcastBinary);

  // Calculate IP range
  const firstIpBinary = networkBinary.substring(0, 31) + '1';
  const lastIpBinary = broadcastBinary.substring(0, 31) + '0';
  const range = `${binaryToIp(firstIpBinary)} - ${binaryToIp(lastIpBinary)}`;

  // Convert mask to decimal
  const decimalMask = maskBinary.match(/.{1,8}/g).map(bin => parseInt(bin, 2)).join('.');

  // Calculate default gateway
  const gatewayBinary = networkBinary.substring(0, 31) + '1';
  const gateway = binaryToIp(gatewayBinary);

  return { network, broadcast, range, decimalMask, gateway };
}

function ipToBinary(ip) {
  return ip.split('.').map(octet => parseInt(octet).toString(2).padStart(8, '0')).join('');
}

function binaryToIp(binary) {
  return binary.match(/.{1,8}/g).map(bin => parseInt(bin, 2)).join('.');
}
