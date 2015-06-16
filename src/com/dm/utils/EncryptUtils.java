package com.dm.utils;

import java.math.BigInteger;
import java.security.MessageDigest;

import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class EncryptUtils {

	public static final String KEY_SHA = "SHA";
	public static final String KEY_MD5 = "MD5";

	/**
	 * MAC
	 * 
	 * <pre>
	 * HmacMD5   
	 * HmacSHA1   
	 * HmacSHA256   
	 * HmacSHA384   
	 * HmacSHA512
	 * </pre>
	 */
	public static final String KEY_MAC = "HmacMD5";

	public static String decyptUTF8(String data) throws Exception {
		int len = data.length();
		data = data + ".";
		byte[] b = new byte[len / 2];
		for (int i = 0; i < data.length() - 1; i = i + 2) {
			b[i / 2] = (byte) Integer.parseInt(data.substring(i, i + 2), 16);
		}
		return new String(b, "UTF-8");
	}

	/**
	 * BASE64
	 * 
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static byte[] decryptBASE64(String data) throws Exception {
		return (new BASE64Decoder()).decodeBuffer(data);
	}

	/**
	 * BASE64
	 * 
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static String encryptBASE64(byte[] data) throws Exception {
		return (new BASE64Encoder()).encodeBuffer(data);
	}

	private static String bytes2Hex(byte[] bts) {
		String des = "";
		String tmp = null;
		for (int i = 0; i < bts.length; i++) {
			tmp = (Integer.toHexString(bts[i] & 0xFF));
			if (tmp.length() == 1) {
				des += "0";
			}
			des += tmp;
		}
		return des;
	}

	/**
	 * MD5
	 * 
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static String encryptMD5(byte[] data) throws Exception {
		MessageDigest md5 = MessageDigest.getInstance(KEY_MD5);
		md5.update(data);
		return bytes2Hex(md5.digest());
	}

	/**
	 * SHA
	 * 
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static byte[] encryptSHA(byte[] data) throws Exception {
		MessageDigest sha = MessageDigest.getInstance(KEY_SHA);
		sha.update(data);
		return sha.digest();
	}

	/**
	 * HMAC Key
	 * 
	 * @return
	 * @throws Exception
	 */
	public static String initMacKey() throws Exception {
		KeyGenerator keyGenerator = KeyGenerator.getInstance(KEY_MAC);
		SecretKey secretKey = keyGenerator.generateKey();
		return encryptBASE64(secretKey.getEncoded());
	}

	/**
	 * HMAC
	 * 
	 * @param data
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static byte[] encryptHMAC(byte[] data, String key) throws Exception {
		SecretKey secretKey = new SecretKeySpec(decryptBASE64(key), KEY_MAC);
		Mac mac = Mac.getInstance(secretKey.getAlgorithm());
		mac.init(secretKey);
		return mac.doFinal(data);
	}

	public static void main(String[] args) throws Exception {
		String str = "";
		System.out.println("sms = " + decyptUTF8(str));

		String inputStr = "1";
		System.out.println("inputStr = " + inputStr);

		byte[] inputData = inputStr.getBytes();
		String code = encryptBASE64(inputData);
		System.out.println("encryptBASE64 = " + code);

		byte[] output = decryptBASE64(code);
		String outputStr = new String(output);
		System.out.println("decryptBASE64 = " + outputStr);

		System.out.println(encryptMD5("hello1234".getBytes()));
		System.out.println(encryptSHA("hello1234".getBytes()));
//		BigInteger md5 = new BigInteger(encryptMD5(inputData));
//		System.out.println("encryptMD5 = " + md5.toString(16));
//
//		BigInteger sha = new BigInteger(encryptSHA(inputData));
//		System.out.println("encryptSHA = " + sha.toString(32));

		String key = initMacKey();
		System.out.println("Mac key = " + key);
		System.out.println("encryptHMAC = " + encryptHMAC(inputData, key));
		String s = "4QrcOUm6Wau+VuBX8g+IPg==";
		System.out.println(decyptUTF8(s));
	}
}