import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class S3Service {

  constructor() { }
  public getS3Bucket(): any {
    const bucket = new S3(
      {
        accessKeyId: environment.S3authorization.accessKeyId,
        secretAccessKey: environment.S3authorization.secretAccessKey,
        region: environment.S3authorization.region
      }
    );

    return bucket;
  }
  deleteFile(filepath) {
    const params = {
      Bucket: environment.S3authorization.bucket,
      Key: filepath
    };
    return new Promise((resolve, reject) => {
      this.getS3Bucket().deleteObject(params, function (err, data) {
        if (err) {
          reject(false);
        }
        resolve(data);

      });
    });
  }

  getFileObject(filepath) {
    const params = {
      Bucket: environment.S3authorization.bucket,
      Key: filepath
    };
    return new Promise((resolve, reject) => {
      this.getS3Bucket().getObject(params, function (err, data) {
        if (err) {
          reject(false);
        }
        resolve(data);

      });
    });
  }
  putFileObject(folder, file,fileName) {
    const params = {
      Bucket: environment.S3authorization.bucket,
      Key: folder + '/' + fileName,
      Body: file
    };
    var options = {
      partSize: 10 * 1024 * 1024,
      queueSize: 1,
      ACL: 'bucket-owner-full-control'
    };
    return new Promise((resolve, reject) => {
      const that = this
      this.getS3Bucket().upload(params, options).send(function (err, data) {
        if (err) {
          reject(false);
        }
        resolve(data);
      });
    });
  }

  download(filePath) {
    const params = {
      Bucket: environment.S3authorization.bucket,
      Key: filePath,
      Expires: 60 * 5,
      ResponseContentDisposition: "attachment"
    };
    var url = this.getS3Bucket().getSignedUrl('getObject', params);
    window.open(url, "_blank");
  }
  async getSingleImageUrl(key) {
    const params = {
      Bucket: environment.S3authorization.bucket,
      Key: key,
      Expires: 60 * 60 * 24 * 7,
    };
    return await this.getS3Bucket().getSignedUrl('getObject', params);
  }

}
