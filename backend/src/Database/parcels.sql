
-- TABLE FOR PARCELS
CREATE TABLE parcels(id VARCHAR(100) NOT NULL,PackageName VARCHAR(100),destination VARCHAR(200),senderEmail VARCHAR(200),  receiverEmail VARCHAR(200), lat VARCHAR(200),long VARCHAR(200), weight VARCHAR(50),price VARCHAR(50), date VARCHAR(50),isDeleted VARCHAR(10) DEFAULT '0',status VARCHAR(100) DEFAULT 'pending',transit VARCHAR(100) DEFAULT '0'
 )

 --PROCEDURE FOR CREATING PARCELS ORDERS

 CREATE PROCEDURE insertParcel(@id VARCHAR(100),@packageName VARCHAR(100),@destination VARCHAR(200),
    @senderEmail VARCHAR(200),@receiverEmail VARCHAR(200),@lat VARCHAR(200), @long VARCHAR(200),@weight VARCHAR(50),@price VARCHAR(50),
    @date VARCHAR(50))
AS
BEGIN

INSERT INTO parcels(
    id,packageName,destination,senderEmail,receiverEmail,lat,long,weight,price,date) 
    VALUES(@id,@packageName,@destination,
    @senderEmail,@receiverEmail,@lat,@long,@weight,@price,@date)

END

-- GETPARCELS

CREATE PROCEDURE allParcels
AS
BEGIN
SELECT * FROM parcels
END

--GET ONE PARCELS

CREATE PROCEDURE singleParcel(@id VARCHAR(100))
AS
BEGIN
SELECT * FROM parcels WHERE id =@id
END

--UPDATE

CREATE PROCEDURE updateParcel(@id VARCHAR(100),@packageName VARCHAR(100),@destination VARCHAR(200),@senderEmail VARCHAR(200),@receiverEmail VARCHAR(200),@lat VARCHAR(200), @long VARCHAR(200),@weight VARCHAR(50),@price VARCHAR(50), @date VARCHAR(50))
AS
BEGIN 
UPDATE parcels SET id=@id , packageName=@packageName , destination=@destination,senderEmail=@senderEmail,receiverEmail=@receiverEmail, lat=@lat,long=@long,weight=@weight,price=@price,date=@date WHERE id =@id

END

--SOFT DELETE


CREATE PROCEDURE softDeleteParcel(@id VARCHAR(100))

AS
BEGIN
    IF EXISTS(SELECT * FROM parcels WHERE id=@id)
    BEGIN
        UPDATE parcels SET isDeleted='1' WHERE id =@id
    END
    ELSE
    BEGIN
        RAISERROR ('No parcel with that ID',11,1);
        RETURN
    END
    END


    -- COMBINE PROCEDURE FOR CREATE AND UPDATE
    