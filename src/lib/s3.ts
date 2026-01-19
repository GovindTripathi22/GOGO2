import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export async function getUploadUrl(key: string, type: string) {
    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET!,
        Key: key,
        ContentType: type,
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 900 });
    return { url, key };
}
