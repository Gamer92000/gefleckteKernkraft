package imhof.cloud.geflecktekernkraft

import com.lynx.tasm.provider.LynxResourceCallback
import com.lynx.tasm.provider.LynxResourceProvider
import com.lynx.tasm.provider.LynxResourceRequest
import com.lynx.tasm.provider.LynxResourceResponse

class FontResourceProvider : LynxResourceProvider<Any, String>() {
    override fun request(
        request: LynxResourceRequest<Any>,
        callback: LynxResourceCallback<String>,
    ) {
        callback.onResponse(LynxResourceResponse.success(request.url))
    }
}
