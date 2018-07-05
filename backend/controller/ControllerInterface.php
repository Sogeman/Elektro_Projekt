<?php

/* 
 * Rene
 */

interface ControllerInterface {
    public function route($inputData);
    public function showResponse($outputData);
}