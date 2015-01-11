mongoimport -d bd -c product --type csv --file product.csv --headerline
mongoimport -d bd -c users --type csv --file users.csv --headerline


mongoexport --db rental --collection property --out property.json
mongoexport --db bd --collection orders --out orders.json

===================================================================================

mongoimport -d rental -c property --type csv --file property.csv --headerline
mongoimport -d rental -c user --type csv --file user.csv --headerline

db.property.remove({ "_id" : ObjectId("54b1fa16e538edb54859442f") });
mongoimport -d rental -c property --file property.json


: ObjectId("54b283d019164be6e354bcda")

db.products.update(
  { _id: 1 },
  {
     $set: { item: "apple" },
     $setOnInsert: { defaultQty: 100 }
  },
  { upsert: true }
)


=========================history==========
db.property.update({ "_id" : ObjectId("54b201efe538edb548594433")}, {$set: { "owner_id": ObjectId("54b283d019164be6e354bcda")}})
db.property.update({ "_id" : ObjectId("54b201efe538edb548594434")}, {$set: { "owner_id": ObjectId("54b283d019164be6e354bcda")}})
db.property.update({ "_id" : ObjectId("54b201efe538edb548594435")}, {$set: { "owner_id": ObjectId("54b283d019164be6e354bcda")}})