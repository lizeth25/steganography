import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h1`
  text-align: center;
  color: black;
  font-family: Kohinoor Bangla;
  font-size: 24px;
  padding: 0.5em;
  margin-block-start: 0em;
  margin-block-end: 0em;
`;

const Description = styled.p`
  text-align: center;
  color: black;
  font-family: Kohinoor Bangla;
  font-size: 18px;
  padding: 0em 5em;
`;

const Home = () => {
  return (
    <div
      style={{
        backgroundColor: "white"
      }}
    >
      <div style={{ padding: "20px 0px" }}></div>
      <Title> What is Steganography?</Title>
      <Description>
        Steganography is the practice of sending data in a concealed format so
        that the very fact of sending that data is disguised to avoid detection.
        The secret data is then extracted only at its destination. There are
        many ways to conceal information using steganography. It is often used
        to hide secret messages or data within media files such as images,
        videos or audio files. The most common method is by embedding
        information into digital images. The difference between the original
        image and the steganographic image would be so subtle that the two
        cannot be distinguished by the naked eye. The purpose of steganography
        is to conceal and deceive, so its advantage is that it can be used to
        secretly transmit messages without the fact of the transmission being
        discovered.
      </Description>

      <div style={{ padding: "10px 0px" }}></div>

      <Title> Uses of Steganography </Title>
      <Description>
        The practice of adding a watermark, such as a trademark, is one common,
        benevolent use of steganography. Watermarking is a technique often used
        by online publishers to identify the source of media files that are
        shared without permission. While there are many legitimate uses for
        steganography, cyber criminals have also been found to use steganography
        to transmit malicious code. For example, cyber criminals can embed BASH
        scripts within macro-enabled Microsoft Excel and Word documents. Once a
        victim opens the Microsoft file, they activate the secret script that
        automates an attack. By introducing this malware into their computer,
        the attacker could be allowed access to the device and the hack would
        begin.
      </Description>

      <div style={{ padding: "10px 0px" }}></div>

      <Title> Recent Examples of Malicious Use </Title>
      <Description>
        <div>
          October 2020: Hackers targeting industrial enterprises hid their
          malware downloader module.
        </div>
        <div>
          June 2020: Cybercriminals used image files to hide JavaScript credit
          card skimming code on compromised e-commerce websites.
        </div>
        <div>
          January 2020: Guardicore Labs researchers discovered a cryptominer
          that was hidden inside WAV audio files.
        </div>
        <div>
          August 2019: TrendMicro researchers found a new variant of keylogger
          and cryptocurrency stealer malware, LokiBot, which hides its malicious
          code inside a jpeg file.
        </div>
        <div>
          April 2019: A former GE engineer was charged with economic espionage.
          The employee encrypted files containing GE’s proprietary information
          and hid them in a photo of a sunset.
        </div>
        <div>
          February 2019: Devcon researchers discovered a malvertising campaign
          that hid malicious JavaScript code.
        </div>
        <div>
          December 2018: Malicious actors hid malicious code in Twitter memes.
        </div>
      </Description>

      <div style={{ padding: "10px 0px" }}></div>

      <Title> What about Cryptography?</Title>
      <Description>
        Cryptography and steganography are closely related and are often
        compared to one another. The main difference between the two is that
        cryptography scrambles the message so that it becomes difficult to
        understand whereas steganography, on the other hand, hides the message
        so there is no knowledge of the very existence of the message. While
        steganography hides information, cryptography focuses on rendering the
        data unreadable to everyone except its intended recipient. Once a stream
        of data is encrypted, only a person who has the decryption key would be
        able to unlock it. The presence of cryptography reveals that something
        is hidden. Often, using encryption might identify the sender or receiver
        of the message as someone with something to hide. The primary advantage
        of using steganography to hide data over encryption is that it helps
        obscure the fact that there is sensitive data hidden in the file. With
        cryptography, an encrypted file is clearly marked and identifiable as
        such. Where cryptography is a science that largely enables privacy,
        steganography is a practice that enables secrecy and deceit. The use of
        steganography can be combined with encryption as an extra step for
        hiding or protecting data.
      </Description>
    </div>
  );
};
Home.propTypes = {};

export default Home;
