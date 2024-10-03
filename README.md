This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Add Vendors: (POST)

https://workfreaks.xyz/App/api.php
{
"gofor" : "addvendors",
"email" : "sivabe13@gmail.com",
"mobileno" : "7373266644",
"vendor_name" : "Siva Chandran",
"company_name" : "TEA",
"country" : "India",
"note" : "Very Best Vendor",
"vendor_type" : "Lens"
}


Edit Vendors: (POST)

https://workfreaks.xyz/App/api.php
{
"gofor" : "editvendors",
"vendor_id" : "1",
"email" : "sivabe13@gmail.com",
"mobileno" : "7373266644",
"vendor_name" : "Siva Chandran",
"company_name" : "TEA",
"country" : "India",
"note" : "Very Best Vendor",
"vendor_type" : "Lens"
}

Delete Vendor:
https://workfreaks.xyz/App/api.php?gofor=vendorsdelete&vendor_id=1

Get Vendor:
https://workfreaks.xyz/App/api.php?gofor=vendorssingle&vendor_id=1

View Vendors:
https://workfreaks.xyz/App/api.php?gofor=vendorslist


https://workfreaks.xyz/App/api.php


{  
"gofor" : " candidates_photo_upload ",
"imgname" : " base64",
}
