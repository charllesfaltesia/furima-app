## usersテーブル
|culumn|type|options|
|------|----|-------|
|nickname|string|null:false
|password|string|null:fals|
|email|string|null:false, unique:true, index:true|

### Association
- has_one :profile
- has_one :destination
- has_many :credit_cards
- has_many :items
- has_many :exhibits
- has_many :drafts
- has_many :negotiates
- has_many :solds


## profilesテーブル
|culumn|type|options|
|------|----|-------|
|first_name|string|null:false|
|family_name|string|null:false|
|first_name_kana|string|null:false|
|family_name_kana|string|null:false|
|birth_year|date|null:false|
|birth_month|date|null:false|
|birth_day|date|null:false|
|user_id|references|null:false, foreign_key:true|

### Association
- belongs_to :user

## destinationsテーブル
|culumn|type|options|
|------|----|-------|
|first_name|string|null:false|
|family_name|string|null:false|
|first_name_kana|string|null:false|
|family_name_kana|string|null:false|
|post_code|integer(7)|null:false|
|prefecture_code|integer|null:false, default:0|
|city|string|null:false|
|house_number|string|null:false|
|building_name|string||
|phone_number|integer|unique:true|
|user_id|references|null:false, foreign_key:true|

### Association
- belongs_to :user

## credit_cardsテーブル
|culumn|type|options|
|------|----|-------|
|card_number|integer|null:false, unique:true|
|expiration_year|integer|null:false|
|expiration_month|integer|null:false|
|security_code|integer|null:false|
|user_id|references|null:false, foreign_key:true|

### Association
- belongs_to :user

## itemsテーブル
|Column|Type|options|
|:----:|:--:|:-----:|
|name|string|null:false|
|info|text|null:false|
|category|integer|null:false, default:0|
|brand|string|
|status|integer|null:false, default:0|
|delivery_burden|integer|null:false, default:0|
|prefecture|integer|null:false, default:0|
|days|integer|null:false, default:0|
|value|integer|null:false|
|fee|integer|null:false|
|return|integer|null:false|
|user_id|references|foreign_key:true|
|exhibit_id|references|
|draft_id|references|
|negotiate_id|references|

### Assosiation 
- has_many :photos
- belongs_to :user

## Photosテーブル
|Column|Type|options|
|:----:|:--:|:-----:|
|photo|string|null: false|
|item_id|references|foreign_key: true|

### Assosiation 
- belongs_to :item

## exhibitsテーブル
|Column|Type|options|
|:----:|:--:|:-----:|

### Assosiation 
- has_one :item
- belongs_to :user
- accepts_nested_attributes_for :item

## draftsテーブル
|Column|Type|options|
|:----:|:--:|:-----:|

### Assosiation 
- has_one :item
- belongs_to :user
- accepts_nested_attributes_for :item

## negotiatesテーブル
|Column|Type|options|
|:----:|:--:|:-----:|

### Assosiation 
- has_one :item
- belongs_to :user
- accepts_nested_attributes_for :item

## soldsテーブル
|Column|Type|options|
|:----:|:--:|:-----:|

### Assosiation 
- has_one :item
- belongs_to :user
- accepts_nested_attributes_for :item
