/*
making payment has two steps
1> create order  when we click on buy now
2> payment varification
and we ll need two api create order payment varification 
above two steps will be done from backend only
whenever we click on paymow button fe will make api call to backend to create an order which will further call to razorpay to create order with our private key after creating order rzrpay send orderid(unique value but public) to bcakend  and backend will send it to frontend then frontend will open a payment dialogue box 
as soon as payment is made razorpay with its webhook will inform our bcakend and backend will verify payment after few time frontend will ask backend if payment was succesful or not 
due to security reasons we dont store payment keys in frontend 
*/