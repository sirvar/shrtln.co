#!/bin/bash
mysql -u root [username] -p[password] << EOF
CREATE DATABASE shrtlnco;
USE shrtlnco;
CREATE TABLE links (
	linkkey VARCHAR(65536) NOT NULL,
	finallink VARCHAR(65535) NOT NULL
)
EOF
