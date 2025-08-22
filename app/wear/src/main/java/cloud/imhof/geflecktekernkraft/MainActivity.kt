package cloud.imhof.geflecktekernkraft

import android.app.Activity
import android.os.Bundle
import android.view.MotionEvent
import androidx.core.view.InputDeviceCompat
import androidx.core.view.MotionEventCompat
import com.lynx.tasm.LynxView
import com.lynx.tasm.LynxViewBuilder

class MainActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val lynxView = buildLynxView()
        runOnUiThread {
            lynxView.setOnGenericMotionListener{ _, ev ->
                if (ev.action == MotionEvent.ACTION_SCROLL &&
                    ev.isFromSource(InputDeviceCompat.SOURCE_ROTARY_ENCODER)
                ) {
                    val delta = ev.getAxisValue(MotionEventCompat.AXIS_SCROLL)

                    if (delta < 0) {
                        lynxView.getJSModule("scrollHandler").fire("up", null)
                    } else {
                        lynxView.getJSModule("scrollHandler").fire("down", null)
                    }
                    true
                } else {
                    false
                }
            }
            lynxView.requestFocus()
        }
        setContentView(lynxView)
        val uri = "main.lynx.bundle"
        lynxView.renderTemplateUrl(uri, "")
    }

    private fun buildLynxView(): LynxView {
        val viewBuilder = LynxViewBuilder()
        viewBuilder.setTemplateProvider(TemplateProvider(this))
        return viewBuilder.build(this)
    }
}