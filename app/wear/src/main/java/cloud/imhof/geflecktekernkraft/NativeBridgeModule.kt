package cloud.imhof.geflecktekernkraft

import android.app.Activity
import android.content.Context
import android.content.ContextWrapper
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.view.WindowManager
import com.lynx.jsbridge.LynxMethod
import com.lynx.jsbridge.LynxModule
import com.lynx.tasm.utils.UIThreadUtils.runOnUiThread


class NativeBridgeModule(context: Context) : LynxModule(context) {
    private var vibrator: Vibrator;
    private var shortVibrate: VibrationEffect;
    private var longVibrate: VibrationEffect;

    init {
        val v = this.mContext.getSystemService(Context.VIBRATOR_MANAGER_SERVICE) as VibratorManager
        vibrator = v.defaultVibrator
        shortVibrate = VibrationEffect.createOneShot(200, 200)
        longVibrate = VibrationEffect.createOneShot(500, 255)
    }

    @LynxMethod
    fun vibrate(strong: Boolean) {
        vibrator.vibrate(if (strong) longVibrate else shortVibrate)
    }

    @LynxMethod
    fun setInhibitor() {
        runOnUiThread {
            getActivity(mContext)?.window?.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        }
    }

    @LynxMethod
    fun unsetInhibitor() {
        runOnUiThread {
            getActivity(mContext)?.window?.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        }
    }

    private fun getActivity(context: Context?): Activity? {
        if (context == null) {
            return null
        } else if (context is ContextWrapper) {
            return if (context is Activity) {
                context
            } else {
                getActivity((context).baseContext)
            }
        }

        return null
    }
}