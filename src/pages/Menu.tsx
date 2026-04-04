import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
};

const PRODUCTS: Product[] = [
  // Fresh & Cold Milk Shake's
  { id: '59', name: 'Sharjah Milkshake', price: 85, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUjQENGiZfhp-_zC7qHxqHu48TyojNeLKAdg&s' },
  { id: '60', name: 'Papaya Milkshake', price: 65, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://howdaily.com/wp-content/uploads/2017/07/vietnamese-papaya-smoothie.jpg' },
  { id: '61', name: 'Banana Milkshake', price: 60, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://yoursmoothieguide.com/wp-content/uploads/2022/01/Banana-Milkshake-5-1.jpg' },
  { id: '62', name: 'Chikoo Milkshake', price: 70, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://i.pinimg.com/474x/d0/56/e5/d056e5074172473d151b437dbeee4303.jpg' },
  { id: '63', name: 'Apple Milkshake', price: 75, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://www.cakenknife.com/wp-content/uploads/2025/09/Apple-Milkshake-Web_9796.jpg' },
  { id: '64', name: 'Oreo Milkshake', price: 75, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://saltandbaker.com/wp-content/uploads/2020/12/oreo-milkshake-recipe.jpg' },
  { id: '65', name: 'Tender Coconut Milkshake', price: 85, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://i.pinimg.com/474x/04/21/98/042198298bbd634dbcf3529848d4a1ab.jpg' },
  { id: '66', name: 'Butter Fruit Milkshake', price: 90, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_fqjpCjb4yHOkqpp5IBJ5umvmgQWPcdhuC0P99HlfjQsxZY0K' },
  { id: '67', name: 'Rose Milkshake', price: 70, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://modestmunchies.com/wp-content/uploads/2022/12/Rose-milkshake-4-of-4.jpg' },
  { id: '68', name: 'Mango Milkshake', price: 70, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA8lcNPGcFfWdMySZ3uaS7OoiSNdbtPOlsmw&s' },
  { id: '69', name: 'Dry Fruits Milkshake', price: 95, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://bharawandadhaba.org/wp-content/uploads/2025/09/dry_fruit_shake_01-500x500.png' },
  { id: '71', name: 'Dates Milkshake', price: 75, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://www.eatingbirdfood.com/wp-content/uploads/2023/01/cropped-healthy-date-shake-hero.jpg' },
  { id: '72', name: 'Strawberry Milkshake', price: 65, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://www.butteredsideupblog.com/wp-content/uploads/2023/06/How-to-Make-a-Strawberry-Milkshake-Without-Ice-Cream-17-scaled.jpg' },
  { id: '70', name: 'Chocolate Milkshake', price: 70, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://wholefoodsoulfoodkitchen.com/wp-content/uploads/2022/04/chocolate-milkshake-no-ice-cream-2.jpg' },
  { id: '73', name: 'Musk Melon Milkshake', price: 70, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAdCrodt1p_yl5DupHEVfD9_Q13VC_IzWkkg&s' },
  { id: '74', name: 'Cold Coffee', price: 60, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://bakingmischief.com/wp-content/uploads/2022/03/coffee-milkshake-square.jpg' },
  { id: '1', name: 'Vanilla Milkshake', price: 80, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://www.foodandwine.com/thmb/aYv9IwIyM4EKLL0o7W1CUSfjXzU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Vanilla-Milkshake-FT-MAG-RECIPE-0325-4ad53abc27a74f7687e510cc17d28d1d.jpg' },
  { id: '2', name: 'Green Pista Milkshake', price: 85, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://www.sharmispassions.com/wp-content/uploads/2019/05/PistaMilkshake3-475x500.jpg' },
  { id: '3', name: 'Kesra Pista Milkshake', price: 85, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://d36v5spmfzyapc.cloudfront.net/wp-content/uploads/2019/05/kesar-pista-milkshake.jpg' },
  { id: '4', name: 'Belgian Chocolate Milkshake', price: 80, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS12BOS6KNmaH1IQUrMC48EoQkHeocxmQhQNQ&s' },
  { id: '5', name: 'Ferrero Milkshake', price: 80, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQpg-encLqxT8MXB6wts0SPXQIjxBJWaW9uRHgV52MFS8PgG031' },
  { id: '6', name: 'Kitkat Milkshake', price: 90, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjm9gzPYbK_iQZ-BvXSVrdYVuwLGCk3lYqtK3S3GFMOKv0v1Be7VZeoQkcNVW14CCC8LB0du2MJvxxNChm7T-pmyvcY0yDSwrar935zA&s=10' },
  { id: '7', name: 'Dairy Milk Milkshake', price: 90, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://www.cadburydessertscorner.com/hubfs/dc-website-2022/recipes/dairy-milk-cold-cocoa-shake/feature/dairy-milk-cold-cocoa-shake.webp' },
  { id: '8', name: "Snicker's Milkshake", price: 90, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSifokH2TKhWiU89DL_A169F52mDSm7dVX-A&s' },
  { id: '9', name: 'Brownie Milkshake', price: 85, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCMh1rW5fr-zQX-nceX2Uid5qheaTYfVOzvw&s' },
  { id: '10', name: '5 Star Milkshake', price: 85, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf2ZvdPy5aRL6KIsD7JZQ-233LB7Fx1kjQKQ&s' },
  { id: '11', name: 'Black Currant Milkshake', price: 90, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsCTcopzBxXmLk9VKh49tTF-D--qTb33fDfA&s' },
  { id: '12', name: 'Butter Scotch Milkshake', price: 95, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://heavenlyhomecooking.com/wp-content/uploads/2021/05/Butterscotch-Shake-Recipe-Featured-2-1.jpg' },
  { id: '13', name: 'Nutella Milkshake', price: 110, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgB6D17qtlr1DOisCc_8LJtmUIZt1xVhDZwg&s' },
  { id: '14', name: 'Protein Milkshake', price: 100, category: "Fresh & Cold Milk Shake's", imageUrl: 'https://www.theseasonedmom.com/wp-content/uploads/2018/12/Cookies-and-Cream-Protein-Shake-8a.jpg' },

  // MUD
  { id: '15', name: 'Mississippi', price: 120, category: 'Mud', imageUrl: 'https://www.allrecipes.com/thmb/bcSVmIp8w0cAginuOzknQ-9V0SY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8349919-491367c6ab1f4d108f2dc5f580d2f0d9.jpg' },
  { id: '16', name: 'Oreo', price: 130, category: 'Mud', imageUrl: 'https://i2.wp.com/lifemadesimplebakes.com/wp-content/uploads/2019/11/Oreo-mud-pie-square-1200.jpg' },
  { id: '17', name: 'Pista', price: 130, category: 'Mud', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBRbAVTTva2AzcAZTohHtH_wje8JG3EHAIgg&s' },
  { id: '18', name: 'Butter Scotch', price: 140, category: 'Mud', imageUrl: 'https://iambaker.net/wp-content/uploads/2025/06/Butterscotch-Mud-Bars-2.jpg' },
  { id: '19', name: 'Nutella', price: 150, category: 'Mud', imageUrl: 'https://themerrymakersisters.com/wp-content/uploads/2015/09/Paleo-Nutella-Mud-Cake-Recipe_feature.jpg' },
  { id: '20', name: 'Black Currant', price: 140, category: 'Mud', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVxenRyPLTvxUkfI3zL1pJdKVs1WXqFX90RA&s' },
  { id: '21', name: 'Kitkat', price: 150, category: 'Mud', imageUrl: 'https://i.pinimg.com/736x/f9/13/39/f913393755e23fd865d68b6c4edd1ade.jpg' },
  { id: '22', name: 'Turkish', price: 150, category: 'Mud', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCCgcTlqf6bsSlXJSggzTIPYqFmbw0w6wBcA&s' },

  // MOJITO
  { id: '23', name: 'Blue Ocean', price: 90, category: 'Mojito', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQPo9mAjh4d6ticXydptLhnlD8C13iF1dYwIJigLMj21-zeYLQd' },
  { id: '24', name: 'Green Apple', price: 90, category: 'Mojito', imageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT3ChC4DDqMxTgoU_a0cDDcKilvrzbckhDFaKX-FIg3lRPvq-DH' },
  { id: '25', name: 'Black Currant', price: 90, category: 'Mojito', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-_x3MLUi0HBi33uvVxcGLEq_RQYjGx3aDmQ&s' },

  // ROLL & MOMO'S
  { id: '26', name: 'Paneer Roll', price: 90, category: "Roll & Momo's", imageUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2024/02/paneer-kathi-roll-recipe.jpg' },
  { id: '27', name: 'Veg Roll', price: 80, category: "Roll & Momo's", imageUrl: 'https://spicecravings.com/wp-content/uploads/2020/12/Paneer-kathi-Roll-Featured-1-500x375.jpg' },
  { id: '28', name: 'Cheese Balls', price: 80, category: "Roll & Momo's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSGXJpx-aAwsSGZmwgBLVp-raR-4tAB2q_LA&s' },
  { id: '29', name: 'Wedges', price: 85, category: "Roll & Momo's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Hh52o13ZsBJONpD0MP4y7KwM38Mx0JGmag&s' },
  { id: '30', name: 'Cheese Nuggets', price: 80, category: "Roll & Momo's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-jXnSPxqvQmKHwGuYpkpJP3QKbOiYd6r12zJVah-QgIq9jhHa' },
  { id: '31', name: "Veg Momo's", price: 85, category: "Roll & Momo's", imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQNjjY89SkWyelm6czdGAZOvbwfnMt0wgZ4U-_ved3Bp5JBji7P' },
  { id: '32', name: 'Potato Twister', price: 75, category: "Roll & Momo's", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5A9QxxgfKnf5SeDgPiE7udtRz30aqeOl_Kg&s' },

  // Fresh Juice
  { id: '33', name: 'Orange', price: 50, category: 'Fresh Juice', imageUrl: 'https://images-prod.healthline.com/hlcmsresource/images/AN_images/orange-juice-1296x728-feature.jpg ' },
  { id: '34', name: 'Mango', price: 50, category: 'Fresh Juice', imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/023/330/719/small/fresh-tropical-fruit-smoothie-mango-juice-with-leaves-and-fruits-generative-ai-photo.jpg' },
  { id: '35', name: 'Pineapple', price: 50, category: 'Fresh Juice', imageUrl: 'https://www.dominicancooking.com/wp-content/uploads/recipe-pera-pina-rice-pineapple-drink-ClaraGon2177.jpg' },
  { id: '36', name: 'Watermelon', price: 50, category: 'Fresh Juice', imageUrl: 'https://d2lswn7b0fl4u2.cloudfront.net/photos/pg-homemade-watermelon-juice-1692282475.jpg' },
  { id: '37', name: 'Chikoo', price: 60, category: 'Fresh Juice', imageUrl: 'https://www.healthwaysdairy.com/wp-content/uploads/2019/06/Chikoo-Berry-Milkshake.jpg' },
  { id: '38', name: 'Mosambi', price: 45, category: 'Fresh Juice', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzhJV7RHq4EhxONOts5xxMBNNvFPuhUEf8aA&s' },
  { id: '39', name: 'Grapes', price: 55, category: 'Fresh Juice', imageUrl: 'https://www.alphafoodie.com/wp-content/uploads/2022/03/How-to-Make-Grape-Juice-Square.jpeg' },
  { id: '40', name: 'Pomegranate', price: 60, category: 'Fresh Juice', imageUrl: 'https://vaya.in/recipes/wp-content/uploads/2018/05/Pomegranate-Juice.jpg' },
  { id: '41', name: 'Musk Melon / Kharbuja', price: 50, category: 'Fresh Juice', imageUrl: 'https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_960,w_960//InstamartAssets/Receipes/muskmelon_juice.webp' },
  { id: '42', name: 'Apple Juice', price: 60, category: 'Fresh Juice', imageUrl: 'https://kuvings.com/cdn/shop/articles/aea141ea2df18774ae085f1809af3268_47c56a92-b011-4b6c-bbeb-72a6166313a5.jpg?v=1756690940&width=1080' },
  { id: '43', name: 'Fresh Lime', price: 30, category: 'Fresh Juice', imageUrl: 'https://uscitrus.com/cdn/shop/articles/lime-juice-nutrition.png?v=1590596940' },
  { id: '44', name: 'Butter Fruit', price: 70, category: 'Fresh Juice', imageUrl: 'https://nfcihospitality.com/wp-content/uploads/2024/10/Juice-Made-with-Butter-Fruit.jpg' },
  { id: '45', name: 'Lime Soda', price: 35, category: 'Fresh Juice', imageUrl: 'https://www.12taste.com/in/wp-content/uploads/2022/03/lemonade-glass-with-lemons-herbs-side-view-white-plaster-scaled.jpg' },
  { id: '46', name: 'Pulpy Grapes', price: 45, category: 'Fresh Juice', imageUrl: 'https://anniesgourmet.net/wp-content/uploads/2023/10/IMG_0969-768x1024.jpg' },
  { id: '47', name: 'Berry Pepper Shot', price: 50, category: 'Fresh Juice', imageUrl: 'https://media.istockphoto.com/id/1246114483/photo/cranberry-juice-with-mint-in-a-glass-cup-on-a-bamboo-board-on-a-background-of-berries.jpg?s=612x612&w=0&k=20&c=OIGzRPEbwP-Qk3THArEe16USKkZ58FymiodYgNFoqmY=' },

  // Special Desserts
  { id: '48', name: 'DBC', price: 170, category: 'Special Desserts', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIX9TNKEHVfYtrQin4-F7V-UNUC-mSlIlDag&s' },
  { id: '49', name: 'Mexican Brownie', price: 80, category: 'Special Desserts', imageUrl: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2009/8/13/3/FNM100109HeMadeSheMade007_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371590940923.webp' },
  { id: '50', name: 'Gudbud Special', price: 120, category: 'Special Desserts', imageUrl: 'https://www.babsprojects.com/wp-content/uploads/2021/06/gadbad-thumbnail.jpg' },
  { id: '51', name: 'Fruit Bowl', price: 85, category: 'Special Desserts', imageUrl: 'https://www.mypricechopper.com/Frontend/Media/Recipes/Grilled_Banana_Split.jpg' },
  { id: '52', name: 'Gudbud', price: 110, category: 'Special Desserts', imageUrl: 'https://www.cookiedoughandovenmitt.com/wp-content/uploads/2020/12/Hot-Cocoa-Fudge-Recipe-6-Picture-Cookie-Dough-and-Oven-Mitt.jpg' },
  { id: '53', name: 'Banana Split', price: 110, category: 'Special Desserts', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI7OAVhP3bEjJ8brP-rbNoGlktyRYfusmxNw&s' },
  { id: '54', name: 'Chocolate Fudge', price: 100, category: 'Special Desserts', imageUrl: 'https://i0.wp.com/curryworld.me/wp-content/uploads/2014/12/dscf9190-imp.jpg?ssl=1' },
  { id: '55', name: 'Tripple Sundae', price: 100, category: 'Special Desserts', imageUrl: 'https://www.cookwithkushi.com/wp-content/uploads/2019/06/best_falooda_ice_cream_Dessert_drink_Indian.jpg' },

  // Falooda
  { id: '56', name: 'Royal Falooda', price: 110, category: 'Falooda', imageUrl: 'https://i0.wp.com/curryworld.me/wp-content/uploads/2014/12/dscf9190-imp.jpg?ssl=1' },
  { id: '57', name: 'Special', price: 70, category: 'Falooda', imageUrl: 'https://www.cookwithkushi.com/wp-content/uploads/2019/06/best_falooda_ice_cream_Dessert_drink_Indian.jpg' },
  { id: '58', name: 'Kesar', price: 80, category: 'Falooda', imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2022/1/IH/YO/JL/49073197/kesar-falooda-mix.jpg' },


  // Lassi
  { id: '75', name: 'Sweet Lassi', price: 50, category: 'Lassi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTovcLD3ogkRwZ4d5p9D1jSIjctjXiDXn75Fw&s' },
  { id: '76', name: 'Mango Lassi', price: 60, category: 'Lassi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEF5xuF_FrNirgBsRdUgDKzZwubPGlh-T_QQ&s' },
  { id: '77', name: 'Banana Lassi', price: 60, category: 'Lassi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDtOHo-2ez_aL6yMsWOH4MNos-FY7VGi2fHw&s' },
  { id: '78', name: 'Dry Fruit Lassi', price: 70, category: 'Lassi', imageUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQeL3TTbznuqfy4aHemL6b0nRUoP2JIGT2G27EF1WAdoZ1MECip' },
  { id: '79', name: 'Pineapple Lassi', price: 70, category: 'Lassi', imageUrl: 'https://www.vegrecipesofindia.com/wp-content/uploads/2021/06/pineapple-juice-1-500x500.jpg' },
  { id: '80', name: 'Chocolate Lassi', price: 70, category: 'Lassi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxZ4DjWOWp6Ewqhep6U9YcKSHBYIyJuthpYbJKaIhovue9sV8R' },

  // Snacks
  { id: '81', name: 'Veg Finger (3 Pcs)', price: 55, category: 'Snacks', imageUrl: 'https://vadilalglobal.com/cdn/shop/files/Veggie_Fingers.jpg?v=1724321221&width=1946' },
  { id: '82', name: 'French Fries', price: 55, category: 'Snacks', imageUrl: 'https://kirbiecravings.com/wp-content/uploads/2019/09/easy-french-fries-1.jpg' },
  { id: '83', name: 'French Fries Perry Perry', price: 60, category: 'Snacks', imageUrl: 'https://cdn.dotpe.in/longtail/store-items/5523029/QgPqC7wa.jpeg' },
  { id: '84', name: 'Veg Grill Sandwich', price: 50, category: 'Snacks', imageUrl: 'https://www.vegrecipesofindia.com/wp-content/uploads/2014/01/grilled-sandwich-4.jpg' },
  { id: '85', name: 'Cheese Sandwich', price: 70, category: 'Snacks', imageUrl: 'https://californiaavocado.com/wp-content/uploads/2023/04/AvoBaconGrilledCheese_0011-scaled-e1682914545487.jpg' },
  { id: '86', name: 'Paneer Sandwich', price: 75, category: 'Snacks', imageUrl: 'https://www.indianhealthyrecipes.com/wp-content/uploads/2019/02/paneer-sandwich.jpg' },
  { id: '87', name: 'Corn Cheese Sandwich', price: 75, category: 'Snacks', imageUrl: 'https://www.vegrecipesofindia.com/wp-content/uploads/2013/07/corn-sandwich-recipe-1.jpg' },
  { id: '88', name: 'Chocolate Sandwich', price: 55, category: 'Snacks', imageUrl: 'https://rakskitchen.net/wp-content/uploads/2014/03/12901677464_24df9320a8_z-500x500.jpg' },

  // Delicious Ice Cream
  { id: '89', name: 'Vanilla', price: 50, category: 'Delicious Ice Cream', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLB7bcRg42Awt5UuKCUU-2J4oCF0sIWPIKnpHTRNR4MzRs8rDDHoiuZ0g7Ocp1t4zJ2DQyORL7JfA7TXNH8mejLWGEdJpeGl4gIQoYIbw&s=10' },
  { id: '90', name: 'Chocolate', price: 60, category: 'Delicious Ice Cream', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzUbEV5tSaJd5peeBu0VD7T5EJFSurCe7yATOMP5C86Winj0DYIjx94r6bGSY2Sn_u7IlXSREGZTCdBBKKukpCwUY8lm68blohlRBJezk&s=10' },
  { id: '91', name: 'Mango', price: 60, category: 'Delicious Ice Cream', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY2MzKEY6oP-PkbUwTsrYzBradYJGJG-K72Q&s' },
  { id: '92', name: 'Black Current', price: 70, category: 'Delicious Ice Cream', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJheP5o_nuMOBLYM2JHKDO3ZVQHLTDkKYfHQ&s' },
  { id: '93', name: 'Cookies and Cream', price: 70, category: 'Delicious Ice Cream', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ76Kngh_mkWfemCNURXqfhJG-Yr9Wps4Zo7A&s' },
  { id: '94', name: 'Butter Scotch', price: 70, category: 'Delicious Ice Cream', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-rhqf2kb7FmH0g5MHSoevcjSBaliXTkpktufJ9YC_pKV8kQ40oQpN5e32CHAiR8egBGP6xbzKo1rvhvH8LBx2hcLKzIk9CwZMIrAxcY&s=10' },
  { id: '95', name: 'Strawberry', price: 60, category: 'Delicious Ice Cream', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFvLbXYQWhXCuJWgfbypZWkz6Ti6XKPCkXDqWhKDEe8veBrDEh2tg4xS5PzVdzeZeIJcoGHgC4swm28wa_Ychr5gs0A51Oj4gdBaYlmTA&s=10' },
  { id: '96', name: 'Kesar Pista', price: 60, category: 'Delicious Ice Cream', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNtTVoeLEOtZvcdVviuoRHcXNcrm_I6B_vkQ&s' },
  { id: '97', name: 'Kaju Draksh', price: 80, category: 'Delicious Ice Cream', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjLsF-IElv-l9UjVjiTXYDagYL-Iw06QiArg&s' },
  { id: '98', name: 'Pista', price: 60, category: 'Delicious Ice Cream', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrbipcV-zYNpQxYs7946z_uNuMOiIiuBUQwHrtARlNmgkJ0owPT0ObB5LNyGhZd7fX7EKZHhU4iZ2WL5IjNKsTTbWwbGpJ9-f6s6ulEVE&s=10' },

  // Kulfi
  { id: '99', name: 'Rose Kulfi', price: 50, category: 'Kulfi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2BlW16Ae070rykEnSwfIqi--HcCWHCQmHJQ&s' },
  { id: '100', name: 'Kesar Pista kulfi', price: 50, category: 'Kulfi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1zYPPmT8pUiYb5yOYlSlnWd4Xe8KZez08ADmSIydnouxSzX3Y' },
  { id: '101', name: 'Mango Pista kulfi', price: 50, category: 'Kulfi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvja6ui8pL5Ng4DshRLdqVsHeq0urtjs8Yw&s' },
  { id: '102', name: 'Black Current kulfi', price: 50, category: 'Kulfi', imageUrl: 'https://b.zmtcdn.com/data/dish_photos/921/8b555f1a4f4f9f6c5ee3ab32f20cc921.png' },
  { id: '103', name: 'Malai kulfi', price: 50, category: 'Kulfi', imageUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTxq3KN474p_NI-cONfl3LSkc1UO8zCDY16bIDYoPnIc-PJHK0P' },
  { id: '104', name: 'Badam kulfi', price: 50, category: 'Kulfi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfCtYnHp6YSosCO4SeWcPVEypJC4yVCR9PLqiLtY8m1Vi2CpmLAXOH6aNOqcWONQW58Mj7W8Qce7VOzjUec2ASuC_fI1bswiUIwtC4wQ&s=10' },
  { id: '105', name: 'Green Pista kulfi', price: 50, category: 'Kulfi', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY1p8LbgNXYGBheDmxAI7c4UU8m0BmcVN8pw&sg' },
];

const CATEGORIES = Array.from(new Set(PRODUCTS.map(p => p.category)));

export default function Menu() {
  const navigate = useNavigate();
  const { addToCart, total, totalItems } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-8 pb-32 px-6 max-w-2xl mx-auto w-full">
      {/* Editorial Headline */}
      <section className="mb-8">
        <h1 className="font-headline font-extrabold text-5xl tracking-tighter text-on-background mb-2">
          Pure <span className="text-primary italic">Zest.</span>
        </h1>
        <p className="text-on-surface-variant text-lg">Handcrafted refreshment delivered to your doorstep.</p>
      </section>

      {/* Glassmorphism Search Bar */}
      <section className="mb-6">
        <div className="relative group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-on-surface-variant">search</span>
          </div>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-16 pl-14 pr-6 bg-surface-container-low border-none rounded-xl text-lg focus:ring-2 focus:ring-primary/20 backdrop-blur-md transition-all placeholder:text-on-surface-variant/50" 
            placeholder="Search for cravings..." 
            type="text"
          />
        </div>
      </section>

      {/* Horizontal Category Scroller */}
      <section className="mb-10">
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
          <div 
            onClick={() => setActiveCategory('All')}
            className={`flex-none flex items-center justify-center font-bold rounded-full px-6 py-3 min-w-[80px] shadow-sm cursor-pointer transition-all ${activeCategory === 'All' ? 'bg-primary text-white' : 'bg-surface-container text-stone-600 hover:bg-stone-100'}`}
          >
            <span className="text-sm font-headline">All</span>
          </div>
          {CATEGORIES.map(cat => (
             <div 
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`flex-none flex items-center justify-center font-bold rounded-full px-6 py-3 min-w-[80px] shadow-sm cursor-pointer transition-all ${activeCategory === cat ? 'bg-primary text-white' : 'bg-surface-container text-stone-600 hover:bg-stone-100'}`}
             >
               <span className="text-sm font-headline">{cat}</span>
             </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="grid grid-cols-2 gap-x-6 gap-y-10">
        {filteredProducts.map(product => (
          <div key={product.id} className="flex flex-col">
            <div className="relative mb-4 group cursor-pointer">
              <img className="w-full aspect-[4/5] object-cover rounded-[30px] shadow-sm group-hover:shadow-md transition-shadow" src={product.imageUrl} alt={product.name}/>
              <button 
                onClick={() => addToCart(product)}
                className="absolute -bottom-4 -right-2 w-14 h-14 liquid-gradient-mango bg-gradient-to-br from-[#705D00] to-[#FFD93D] text-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(112,93,0,0.3)] hover:scale-105 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>add</span>
              </button>
            </div>
             <h3 className="font-headline font-bold text-lg leading-tight text-on-surface px-1 mb-1">{product.name}</h3>
             <p className="text-secondary font-bold px-1">₹{product.price}</p>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-2 text-center text-on-surface-variant mt-10">
            No items found for "{searchQuery}"
          </div>
        )}
      </section>

      {/* Floating Checkout Bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[40]">
          <div className="bg-stone-900/90 backdrop-blur-2xl rounded-full px-6 py-4 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
            <div className="flex flex-col">
              <span className="text-white/60 text-xs font-medium tracking-wider uppercase">Your Order</span>
              <span className="text-white font-bold">{totalItems} Item{totalItems > 1 ? 's' : ''} | ₹{total}</span>
            </div>
            <button onClick={() => navigate('/checkout')} className="bg-secondary-container text-on-secondary-container font-headline font-bold px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform">
              Checkout
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
