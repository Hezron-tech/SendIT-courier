import { Request, RequestHandler, Response } from "express";
import { v4 as uid } from "uuid";
import Connection from "../DatabaseHelpers/db";
import { ParcelSchema } from "../Helpers/validators";
const db = new Connection();

interface ExtendedRequest extends Request {
  body: {
    id: string;
    PackageName: string;
    destination: string;
    senderEmail: string;
    receiverEmail: string;
    lat: string;
    long: string;
    weight: string;
    price: string;
    date: string;
  };
}
export const insertParcel = async (req: ExtendedRequest, res: Response) => {
  try {
    const id = uid();
    const {
      PackageName,
      destination,
      senderEmail,
      receiverEmail,
      lat,
      long,
      weight,
      price,
      date,
    } = req.body;

    const { error, value } = ParcelSchema.validate(req.body);
    if (error) {
      return res.status(500)
      .json({ error: error.details[0].message });
    }
    db.exec("insertUpdateParcel", {
      id,
      PackageName,
      destination,
      senderEmail,
      receiverEmail,
      lat,
      long,
      weight,
      price,
      date,
    });

    res.status(200).json({ message: "order created Successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getParcels: RequestHandler = async (req, res) => {
  try {
    const { recordset } = await db.exec("allParcels");
    res.json(recordset);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getParcel: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id;
    const { recordset } = await db.exec("singleParcel", { id });
    if (!recordset[0]) {
      res.status(404).json({ message: "Parcel Not Found" });
    } else {
      res.json(recordset);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateParcel: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
    const {
      PackageName,
      destination,
      senderEmail,
      receiverEmail,
      lat,
      long,
      weight,
      price,
      date,
    } = req.body as {
      PackageName: string;
      destination: string;
      senderEmail: string;
      receiverEmail: string;
      lat: string;
      long: string;
      weight: string;
      price: string;
      date: string;
    };
    const { recordset } = await db.exec("singleParcel", { id });
    if (!recordset[0]) {
      res.status(404).json({ message: "Parcel Not Found" });
    } else {
      await db.exec("insertUpdateParcel", {
        id,
        PackageName,
        destination,
        senderEmail,
        receiverEmail,
        lat,
        long,
        weight,
        price,
        date,
      });
      res.status(200).json({ message: "Parcel Updated ..." });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateDelivered: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
    const { recordset } = await db.exec("updateParcel", { id });
    return res.json({ message: "Updated..." });
  } catch (error) {
    res.json({ error });
  }
};

export const deleteParcel: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
    const { recordset } = await db.exec("singleParcel", { id });
    if (!recordset[0]) {
      res.status(404).json({ message: "Parcel Not Found" });
    } else {
      // Procedure Way
      await db.exec("softDeleteParcel", { id });
      res.json({ message: "Parcel Deleted" });

     
    }
  } catch (error: any) {
    res.json({ error });
  }
};

export const statusParcel: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const id = req.params.id;
    const { recordset } = await db.exec("singleParcel", { id });
    if (!recordset[0]) {
      res.status(404).json({ message: "Parcel Not Found" });
    } else {
      await db.exec("statusParcel", { id });
      res.json({ message: "Parcel Delivered" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const sentParcels: RequestHandler<{ senderEmail: string }> = async (
  req,

  res
) => {
  try {
    const senderEmail = req.params.senderEmail;

    const { recordset } = await db.exec("getSentparcels", { senderEmail });

    res.status(200).json(recordset);
  } catch (error) {
    res.status(400).json({ message: "Parcels Not Found!" });
  }
};

//received emails

export const receivedParcels: RequestHandler<{
  receiverEmail: string;
}> = async (
  req,

  res
) => {
  try {
    const receiverEmail = req.params.receiverEmail;

    const { recordset } = await db.exec("getReceived", { receiverEmail });

    res.status(200).json(recordset);
  } catch (error) {
    res.status(400).json({ message: "No parcels received !" });
  }
};
