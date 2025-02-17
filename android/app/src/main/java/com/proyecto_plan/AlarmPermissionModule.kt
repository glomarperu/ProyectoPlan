package com.proyecto_plan

import android.content.Context
import android.content.pm.PackageManager
import android.os.Build
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class AlarmPermissionModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "AlarmPermissionModule"
    }

    @ReactMethod
    fun checkExactAlarmPermission(promise: Promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            val context: Context = reactApplicationContext
            val hasPermission = ContextCompat.checkSelfPermission(context, "android.permission.SCHEDULE_EXACT_ALARM") == PackageManager.PERMISSION_GRANTED
            promise.resolve(hasPermission)
        } else {
            promise.resolve(true) // No se requiere en versiones anteriores a Android 12
        }
    }
}