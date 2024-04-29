#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
#define BME_SCK 13
#define BME_MISO 12
#define BME_MOSI 11
#define BME_CS 10

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BME680 bme; // I2C

const byte buffer_size = 64;
char received_chars[buffer_size];
char temp_chars[buffer_size];
char message_raw[buffer_size] = {0};
long integer_raw = 0;
boolean new_data = false;

void setup() {
  Serial.begin(9600);
  //Serial.println("BME680");
  while (!Serial);
  if (!bme.begin()) {
    Serial.println("Could not find a valid BME680 sensor, check wiring!");
    while (1);
  }
  // Set up oversampling and filter initialization
  bme.setTemperatureOversampling(BME680_OS_8X);
  bme.setHumidityOversampling(BME680_OS_8X);
  bme.setPressureOversampling(BME680_OS_16X);
  bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
}

void loop() {
  recieve_input();
  if (new_data == true) {
    strcpy(temp_chars, received_chars);
    parse_data();
    process_data();
    //print_input();
  }
}

void recieve_input() {
  static byte index = 0;
  static boolean in_progress = false;
  char start_char = '@';
  char end_char = '#';
  char raw;

  while (Serial.available() > 0 && new_data == false) {
    raw = Serial.read();
    if (in_progress == true) {
      if (raw != end_char) {
        received_chars[index] = raw;
        index++;
        if (index >= buffer_size) {
          index = buffer_size - 1;
        }
      }
      else {
        received_chars[index] = '\0';
        in_progress = false;
        index = 0;
        new_data = true;
      }
    }
    else if (raw == start_char) {
      in_progress = true;
    }
  }
}

void parse_data() {
  char * strtok_index_;
  strtok_index_ = strtok(temp_chars, ":");
  strcpy(message_raw, strtok_index_);
  strtok_index_ = strtok(NULL, ":");
  integer_raw = atol(strtok_index_);
}

void process_data() {
  if (! bme.performReading()) {
    Serial.println("Failed to perform reading :(");
    return;
  }  
  if (message_raw[0] == 'g') {
    Serial.print(bme.temperature);
    Serial.print(",");
    Serial.print(bme.humidity);
    Serial.print(",");
    Serial.println(bme.pressure/100.0);       
  }
  new_data = false;
}

void print_input() {
  Serial.print("@");
  Serial.print(received_chars);
  Serial.println('#');
}
